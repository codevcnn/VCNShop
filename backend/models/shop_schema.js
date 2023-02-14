import mongoose from 'mongoose'

const { Schema } = mongoose

const ShopsSchema = new Schema({
    username: {
        type: String,
        require: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    greeting: {
        type: String,
    },
    products: {
        type: Object,
        required: true,
        ids: {
            type: Array,
        },
    },
    contact_info: {
        type: Object,
        required: true,
        phone: {
            type: String,
            required: true,
        },
        mail: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    background: {
        type: String,
    },
    avatar: {
        type: String,
    }
})

const ShopsModel = mongoose.model('shops', ShopsSchema)

export default ShopsModel