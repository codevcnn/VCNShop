import mongoose from 'mongoose'

const { Schema } = mongoose

const CouponsSchema = new Schema({
    type: {
        type: String,
        require: true,
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,
        require: true,
    },
    apply_for: {
        type: Object,
        required: true,
        'all': {
            type: Boolean,
            required: function () { return this.apply_for.list.length === 0 },
        },
        'list': {
            type: Array,
            required: function () { return !this.apply_for.all },
        }
    },
    shop: {
        type: Object,
        required: true,
        'id': {
            type: Number,
            required: true,
        },
        'name': {
            type: String,
        },
    },
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    expireOn: {
        type: Date,
        required: true,
    },
    code: {
        type: Object,
        'type': {
            type: String,
            required:true,
        },
        'id': {
            type: String,
            required: true,
            index: true,
            unique: true,
        }
    },
})

const CouponsModel = mongoose.model('coupons', CouponsSchema)

export default CouponsModel