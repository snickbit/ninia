import {Ninia, PromiseResolve} from './Ninia'
import {Store} from './Store'

export {Ninia, Store}
export const ninia = new Ninia()

export function createStore(name = 'default', options = {}, hydration = {}) {
	if (!ninia.get(name)) {
		let store

		if (ninia.pending[name]) {
			store = ninia.pending[name]
			store.$config(name, options, hydration)
		} else {
			store = new Store(name, options, hydration)
		}

		ninia.set(name, store)
	}

	return ninia.get(name)
}

function createPending(name = 'default') {
	ninia.pending[name] = new Store(name)

	return ninia.pending[name]
}

export function useStore(name = 'default') {
	if (!ninia.get(name)) {
		return createPending(name)
	}
	return ninia.get(name)
}

useStore.promise = async(name = 'default') => {
	if (!ninia.get(name)) {
		return new Promise((resolve: PromiseResolve<any>) => {
			ninia.wait(name, resolve)
		})
	}
	return ninia.get(name)
}
