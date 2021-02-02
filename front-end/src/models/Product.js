import { types } from 'mobx-state-tree';

const Product = types.model({
    code: types.optional(types.string, ''),
    name: types.optional(types.string, '')
}).actions(self => ({
    set(value, property) {
        self[property] = value
    }
})).views(self => ({
    
}))

export default Product;