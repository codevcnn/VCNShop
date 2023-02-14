import express from 'express'
import { getShop } from '../controllers/shop_controller.js'

const router = express.Router()

router.get('/getShopInfo', getShop)

export default router