import express from 'express'
import {
    addProduct,
} from '../controllers/cart_controller.js'

const router = express.Router()

router.get('/addProductToCart', addProduct)

export default router