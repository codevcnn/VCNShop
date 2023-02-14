
import UsersModel from "../models/user_schema.js"
import CouponsModel from '../models/coupon_schema.js'
import BaseError from "../utils/base_error.js"

//get coupons info from an user
const getCoupons = async (req, res, next) => {
    try {
        if (!req.params.username) throw new BaseError('Wrong request property', 400)

        let user = await UsersModel.findOne({ username: req.params.username }).lean()
        if (!user) throw new BaseError('User not found', 404)

        let user_coupons_list = user.coupons.list
        let user_coupons_ids = user_coupons_list.map(({ id }) => id)

        let coupons = await CouponsModel.aggregate([
            { $match: { 'code.id': { $in: user_coupons_ids } } },
            { $sort: { cost: -1 } }
        ])
        if (!coupons) throw new BaseError('Coupons not found', 404)

        for (let user_coupon of user_coupons_list) {
            for (let coupon of coupons) {
                if (coupon.code.id === user_coupon.id) {
                    coupon.quantity = user_coupon.quantity
                    coupon.picked = user_coupon.picked
                    break
                }
            }
        }

        res.status(200).json({
            coupons,
        })

    } catch (error) {
        next(error)
    }
}

const confirmCoupons = async (req, res, next) => {
    try {
        let { username } = req.params
        let { coupon_ids } = req.body

        if (!username || !coupon_ids) throw new BaseError('Wrong request property', 400)

        await UsersModel.updateOne(
            { username },
            { $set: { 'coupons.list.$[coupon].picked': true } },
            { arrayFilters: [{ 'coupon.id': { $in: coupon_ids } }] }
        )

        await UsersModel.updateOne(
            { username },
            { $set: { 'coupons.list.$[coupon].picked': false } },
            { arrayFilters: [{ 'coupon.id': { $nin: coupon_ids } }] }
        )

        res.status(200).json({})

    } catch (error) {
        next(error)
    }
}

const cancelPickCoupon = async (req, res, next) => {
    try {
        let { username } = req.params
        let { type } = req.body

        if (!username || !type) throw new BaseError('Wrong request property', 400)

        if (type === 'Free Shipping') {
            await UsersModel.updateOne(
                { username },
                { $set: { 'coupons.list.$[coupon].picked': false } },
                { arrayFilters: [{ 'coupon.type': type }] }
            )
        } else {
            await UsersModel.updateOne(
                { username },
                { $set: { 'coupons.list.$[coupon].picked': false } },
                { arrayFilters: [{ 'coupon.type': { $ne: 'Free Shipping' } }] }
            )
        }

        res.status(200).json({})

    } catch (error) {
        next(error)
    }
}

export {
    getCoupons, confirmCoupons, cancelPickCoupon
}