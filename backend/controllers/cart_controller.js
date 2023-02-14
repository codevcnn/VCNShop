import ProductsModel from '../models/product_schema.js'
import BaseError from '../utils/base_error.js'

//add a new product to cart
const addProduct = async (req, res, next) => {
    try {
        let { productId, options } = req.query
        if (!productId) throw new BaseError('Wrong property name', 400)

        let product = await ProductsModel.findOne({ _id: productId })
        if (!product) throw new BaseError('Product not found', 404)

        let { size, color } = options || { size: null, color: null }

        let product_update = {
            _id: product._id,
            image_link: product.image_link,
            name: product.name,
            size: size || product.options.size[0],
            color: color || product.options.color[0],
            shop: product.shop.name,
            price: product.price.value,
        }

        res.status(200).json({
            product: product_update,
        })

    } catch (error) {
        next(error)
    }
}

export {
    addProduct,
}