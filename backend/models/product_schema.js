import mongoose from 'mongoose'

const { Schema } = mongoose

const ProductsSchema = new Schema({
    image_link: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Object,
        required: true,
        value: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: Number,
            required: true,
            default: 'USD',
        }
    },
    shop: {
        type: Object,
        required: true,
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        }
    },
    sold: {
        type: Object,
        required: true,
        count: {
            type: Number,
            required: true,
            default: 0,
        },
        in_a_week: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    sku: {
        type: String,
        required: true,
    },
    options: {
        type: Object,
        required: true,
        size: [{ type: String, }],
        color: [{ type: String, }],
    },
    images: [{ type: String }],
    description: {
        type: String,
        required: true,
    },
    sale: {
        type: Object,
        required: true,
        off: {
            type: String,
            default: '0',
        },
    },
    review: {
        type: Object,
        count: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        reviews: [{
            name: { type: String, required: true },
            username: { type: String, required: true },
            avatar: { type: String, required: true },
            rating: { type: Number, required: true },
            title: { type: String, required: true },
            comment: { type: String, required: true },
            createdOn: { type: Date, required: Date.now },
        }]
    },
    brand: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const ProductsModel = mongoose.model('products', ProductsSchema)

export default ProductsModel