import {createStore, Ninia, Store} from '../src'

describe('Ninia', () => it('new Ninia() should be an instance of Ninia', () => expect(new Ninia()).toBeInstanceOf(Ninia)))

describe('createStore', () => {
	let instance: Store
	beforeEach(() => instance = createStore())
	it('createStore() instance should be an instance of Store', () => expect(instance).toBeInstanceOf(Store))
	it('instance should have the id "default"', () => expect(instance.$id).toBe('default'))
})

