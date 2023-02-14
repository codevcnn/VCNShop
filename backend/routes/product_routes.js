import express from 'express'
import {
    getProducts, getTopProducts, getOneProduct,
    newReview, uploadImages,
} from '../controllers/product_controllers.js'
import filesHandler from '../middlewares/files_handler.js'

const router = express.Router()

router.get('/getProducts', getProducts)

router.get('/getBestSelling', getTopProducts)

router.get('/getTopWeek', getTopProducts)

router.get('/getProductDetail/:productId', getOneProduct)

router.put('/newReview', newReview)

router.post('/uploadImages', filesHandler, uploadImages)

export default router