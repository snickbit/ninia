# Class: Ninia

## Table of contents

### Constructors

- [constructor](Ninia.md#constructor)

### Properties

- [emitter](Ninia.md#emitter)
- [pending](Ninia.md#pending)
- [stores](Ninia.md#stores)
- [waiting](Ninia.md#waiting)

### Methods

- [emit](Ninia.md#emit)
- [events](Ninia.md#events)
- [get](Ninia.md#get)
- [off](Ninia.md#off)
- [on](Ninia.md#on)
- [set](Ninia.md#set)
- [wait](Ninia.md#wait)

## Constructors

### constructor

• **new Ninia**()

## Properties

### emitter

• **emitter**: `Emitter`<`Record`<`EventType`, `unknown`\>\>

___

### pending

• **pending**: `Pending` = `{}`

___

### stores

• **stores**: `Stores` = `{}`

___

### waiting

• **waiting**: `Waiting` = `{}`

## Methods

### emit

▸ **emit**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

___

### events

▸ **events**(): `EventHandlerMap`<`Record`<`EventType`, `unknown`\>\>

#### Returns

`EventHandlerMap`<`Record`<`EventType`, `unknown`\>\>

___

### get

▸ **get**(`id`): [`Store`](Store.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`Store`](Store.md)

___

### off

▸ **off**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

___

### on

▸ **on**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

___

### set

▸ **set**(`id`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value` | [`Store`](Store.md) |

#### Returns

`void`

___

### wait

▸ **wait**(`id`, `resolve`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `resolve` | `PromiseResolve`<`any`\> |

#### Returns

`void`
