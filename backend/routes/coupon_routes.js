import express from 'express'
import {
    getCoupons, confirmCoupons, cancelPickCoupon,
} from '../controllers/coupon_controller.js'

const router = express.Router()

router.get('/getCoupons/:username', getCoupons)

router.put('/confirmCoupons/:username', confirmCoupons)

router.put('/cancelPickCoupon/:username', cancelPickCoupon)

export default router