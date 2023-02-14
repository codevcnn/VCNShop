import ShopsModel from '../models/shop_schema.js'
import BaseError from '../utils/base_error.js'

const getShop = async (req, res, next) => {
    try {
        let { username } = req.query
        if (!username) throw new BaseError('Wrong property name', 400)

        let shopInfo = await ShopsModel.findOne({ username: username }).lean()

        if (!shopInfo) throw new BaseError('Shop not found', 400)

        res.status(200).json({
            shopInfo,
        })

    } catch (error) {
        next(error)
    }
}

export {
    getShop,
}