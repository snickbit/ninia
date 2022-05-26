import {objectClone} from '@snickbit/utilities'
import {Handler} from 'mitt'
import {ninia} from './index'

export type StoreKey = string
export type StoreValue = any

export interface StoreOptions {
	name: string
	persist?: string[] | boolean
	getters?: StoreGetters
	actions?: StoreActions

	[key: string]: any
}

export interface StoreState {
	[key: StoreKey]: StoreValue
}

export type WatchStop = () => void
export type Watchers = Record<string, WatchStop>

export type StoreAction = (this: Store, ...args: any[]) => any
export type StoreGetter = (this: Store) => StoreValue

export type StoreActions = Record<string, StoreAction>
export type StoreGetters = Record<string, StoreGetter>

export interface Store {
	[key: string | symbol]: any
}

export class Store {
	protected state: StoreState = {}

	protected originalState: StoreState = {}

	protected proxy: Store

	protected actions: StoreActions = {}

	protected getters: StoreGetters = {}

	protected ready = false

	options: StoreOptions = {
		name: 'default',
		persist: []
	}

	protected id = (...keys: string[]) => ['ninia', this.$id, ...keys].join('.')

	constructor(name: string, options?: Partial<StoreOptions>, hydration?: StoreState) {
		this.$config(name, options, hydration)

		this.proxy = new Proxy(this, {
			get(target: Store, prop: string, receiver?: any): any {
				if (prop in target) {
					return target[prop]
				}

				if (target.$has(prop)) {
					return target.$get(prop)
				}

				if (prop in target.actions) {
					return target.callAction.bind(target, prop)
				}

				if (prop in target.getters) {
					return target.callGetter.call(target, prop)
				}

				return Reflect.get(target, prop, receiver)
			},
			set(target: Store, prop: string, value?: any) {
				target.$set(prop, value)
				return true
			}
		})

		this.$state = new Proxy(this.state, {
			get: (target: Store, prop: string) => {
				if (this.$has(prop)) {
					return this.$get(prop)
				}
				return undefined
			},
			set: (target: Store, prop: string, value: any) => {
				this.$set(prop, value)
				return true
			}
		})

		this.$getters = new Proxy(this.getters, {
			get: (target: Store, key: string) => {
				if (key in target) {
					return this.callGetter(key)
				}
				return undefined
			}
		})

		this.$actions = new Proxy(this.actions, {
			get: (target, key: string) => {
				if (key in target) {
					return this.callAction.bind(this, key)
				}

				throw new Error(`Call to undefined action ${key}`)
			}
		})

		return this.proxy
	}

	get $id() {
		return this.options.name
	}

	get $ready() {
		return this.ready
	}

	protected callAction(name: string, ...args: any[]) {
		return this.actions[name].call(this, ...args)
	}

	protected callGetter(name: string) {
		return this.getters[name]
	}

	$config(name: string, options?: Partial<StoreOptions>, hydration?: StoreState) {
		let isPending = !options && !hydration
		if (!options) {
			options = {}
		}
		if (!hydration) {
			hydration = {}
		}
		const {actions, getters, ...rest} = options
		this.options = {
			...this.options,
			...rest,
			name: name || this.options.name || 'default'
		}

		if (!isPending) {
			this.originalState = objectClone(hydration)
			for (let key in hydration) {
				this.state[key] = hydration[key]
			}
		}

		this.actions = actions || {}

		for (let key in getters) {
			this.getters[key] = getters[key].bind(this, this.$state)
		}

		this.ready = !isPending
	}

	$get(key: StoreKey) {
		return this.state[key]
	}

	$set(key: StoreKey, value: StoreValue) {
		this.state[key] = value
	}

	$has(key: StoreKey) {
		return key in this.state
	}

	$keys() {
		return Object.keys(this.state)
	}

	$patch(data: StoreState) {
		for (let key in data) {
			this.$set(key, data[key])
		}
	}

	$reset() {
		this.state = this.originalState
	}

	$on(event: string, callback: Handler) {
		ninia.on(this.id(event), callback)
	}

	$off(event: string, callback: Handler) {
		ninia.off(this.id(event), callback)
	}

	$emit(event: string, data: any) {
		ninia.emit(this.id(event), data)
	}
}
