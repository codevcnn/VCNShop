import mongoose from 'mongoose'

const { Schema } = mongoose

const UsersSchema = new Schema({
    username: {
        type: String,
        require: true,
        index: true,
        unique: true,
    },
    coupons: {
        type: Object,
        required: true,
        count: {
            type: Number,
            required: true,
        },
        list: {
            type: Array,
            required: true,
        }
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
})

const UsersModel = mongoose.model('users', UsersSchema)

export default UsersModel