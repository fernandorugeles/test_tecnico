import { types } from 'mobx-state-tree';

const Order = types.model({
    customer_name: types.optional(types.string, ''),
    customer_email: types.optional(types.string, ''),
    customer_mobile: types.optional(types.string, ''),
    id_product: types.optional(types.integer, 0),
    reference: types.optional(types.string, ''),
}).actions(self => ({
    set(property, value) {
        self[property] = value
    }
})).views(self => ({

}))

export default Order;