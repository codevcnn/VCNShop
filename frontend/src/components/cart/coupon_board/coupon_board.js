import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCoupons, confirmCoupons, cancelPickCoupon
} from "../../../store/actions/coupon_actions"
import CircularProgress from '@mui/material/CircularProgress'
import Coupon from "./coupon"
import CancelPickCoupons from "./cancel_pick_coupons"
import MoodBadIcon from '@mui/icons-material/MoodBad'
import { toast } from 'react-toastify'

const CouponBoard = ({ openCouponBoard, handleOpenCouponBoard }) => {
    const { coupons, loading, error } = useSelector(({ coupons }) => coupons)
    const { confirming, canceling } = useSelector(({ coupons }) => coupons)
    const [IdsCouponsPicked, setIdsCouponsPicked] = useState([]) //object list of coupon
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCoupons())
    }, [dispatch, openCouponBoard])

    useEffect(() => { //check coupons were picked at first rendering
        if (coupons && coupons.length > 0) {
            let picked_coupons = []
            for (let { code, picked, type } of coupons) {
                if (picked && type === 'Free Shipping')
                    picked_coupons.push({ type, id: code.id })
                if (picked && type !== 'Free Shipping')
                    picked_coupons.push({ type: 'Other', id: code.id })
            }
            setIdsCouponsPicked(picked_coupons)
        }
    }, [coupons])

    const initActiveCoupon = (coupon_id) => { //(for active) compare ids of coupon were rendered by map function with picked ids was saved into state
        if (!IdsCouponsPicked) return
        if (IdsCouponsPicked.findIndex(({ id }) => id === coupon_id) < 0) return false
        return true
    }

    const pickCoupons = (coupon_type, coupon_id) => { //Process: if type is not existed then push into state, if type is existed then replace it in state
        let IdsCoupons_temp = [...IdsCouponsPicked]
        let index_of_type = IdsCoupons_temp.findIndex(({ type }) => type === coupon_type)
        if (index_of_type < 0) {
            IdsCoupons_temp.push({ type: coupon_type, id: coupon_id })
            return setIdsCouponsPicked(IdsCoupons_temp)
        }
        IdsCoupons_temp[index_of_type] = { type: coupon_type, id: coupon_id }
        setIdsCouponsPicked(IdsCoupons_temp)
    }

    const cancelPickCoupons = (coupon_type) => {
        dispatch(cancelPickCoupon(coupon_type))
        setIdsCouponsPicked(pre => pre.filter(({ type }) => type !== coupon_type)) //remove type was canceled from state
    }

    const submitCouponsPicked = (confirm) => {
        if (!confirm && !confirming && !canceling)
            return handleOpenCouponBoard(false)
        if (confirm && !confirming && !canceling) {
            if (IdsCouponsPicked.length > 0) {
                dispatch(confirmCoupons(
                    IdsCouponsPicked.map(({ id }) => id) //get ids from state to dispatch
                ))
                toast.success('Applied coupons you chose!')
                return handleOpenCouponBoard(false)
            } else {
                toast.warn('Please pick at least one coupon!')
            }
        }
    }

    return (
        <CouponBoardArea id="Voucher_Board"
            open={openCouponBoard}
            anchor='right'
            onClose={() => submitCouponsPicked(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <CouponBoardTitle>
                    COUPONS
                </CouponBoardTitle>
                <Preface>
                    <span>Pick coupons you want.</span><br />
                    <span style={{ display: 'block', width: '100%' }}>
                        You can only pick up to two coupons, one for free shipping coupons,
                        one for other coupons.
                    </span>
                </Preface>
                <Hr />
                {loading ? (
                    <Loading size={25} thickness={6} />
                ) : error ? (
                    <Error>
                        {error.message}
                    </Error>
                ) : coupons && coupons.length > 0 ?
                    <VouchersArea>
                        <VouchersAreaTitle>
                            Free Shipping Coupons
                        </VouchersAreaTitle>
                        <FreeShippingCoupons>
                            {coupons.map((coupon) =>
                                coupon.type === 'Free Shipping' &&
                                <Coupon //coupon
                                    key={coupon._id}
                                    coupon={coupon}
                                    pickCoupons={pickCoupons}
                                    category="Free Shipping" //name of input
                                    checked={initActiveCoupon(coupon.code.id)}
                                />
                            )}
                        </FreeShippingCoupons>

                        <CancelPickCoupons
                            amount={coupons.length}
                            cancelPickCoupons={cancelPickCoupons}
                            type="Free Shipping"
                            canceling={canceling}
                        />

                        <Hr className="speperate_free_shipping_and_other" />
                        <VouchersAreaTitle>
                            Other Coupons
                        </VouchersAreaTitle>
                        <OtherCoupons>
                            {coupons.map((coupon) =>
                                coupon.type !== 'Free Shipping' &&
                                <Coupon //coupon
                                    key={coupon._id}
                                    coupon={coupon}
                                    pickCoupons={pickCoupons}
                                    category="Other" //name of input
                                    checked={initActiveCoupon(coupon.code.id)}
                                />
                            )}
                        </OtherCoupons>

                        <CancelPickCoupons
                            amount={coupons.length}
                            cancelPickCoupons={cancelPickCoupons}
                            type="Other"
                            canceling={canceling}
                        />

                        <PickCount>
                            <span>* You picked </span><b>{IdsCouponsPicked.length}</b>
                            <span>{IdsCouponsPicked.length < 2 ? ' coupon.' : ' coupons.'}</span>
                        </PickCount>
                    </VouchersArea>
                    :
                    <EmptyCoupons>
                        <MoodBadIcon sx={{ height: '2.5em', width: '2.5em' }} />
                        <span>Oops!! You don't have any coupon.</span>
                    </EmptyCoupons>
                }
            </div>
            <ButtonArea>
                <Button onClick={() => submitCouponsPicked(false)}>
                    Cancle
                </Button>
                <Button onClick={() => submitCouponsPicked(true)}>
                    {confirming ?
                        <CircularProgress
                            sx={{ color: 'white', margin: 'auto', }}
                            size={20} thickness={6}
                        />
                        : <span>Confirm</span>
                    }
                </Button>
            </ButtonArea>
        </CouponBoardArea>
    )
}

export default CouponBoard

const CouponBoardArea = styled(Drawer)({
    '& div.MuiPaper-root.MuiDrawer-paper': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        zIndex: '10',
    }
})

const CouponBoardTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
})

const Preface = styled('p')({
    margin: 'auto',
    fontFamily: 'Nunito',
    width: '30vw',
    boxSizing: 'border-box',
    textAlign: 'center',
})

const Hr = styled('hr')({
    backgroundColor: 'black',
    borderWidth: '0',
    height: '3px',
    width: '50%',
    margin: '10px auto',
    '&.speperate_free_shipping_and_other': {
        marginTop: '20px',
    }
})

const VouchersArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
})

const Loading = styled(CircularProgress)({
    display: 'flex',
    padding: '20px 0',
    color: 'black',
    margin: 'auto',
})

const Error = styled('div')({
    color: 'red',
    fontFamily: '"Nunito", "sans-serif"',
    textAlign: 'center',
})

const VouchersAreaTitle = styled('h2')({
    margin: '0',
    marginLeft: '10px',
    fontFamily: '"Kanit", "sans-serif"',
    marginBottom: '5px',
})

const FreeShippingCoupons = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
})

const OtherCoupons = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
})

const PickCount = styled('p')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    margin: '0',
    marginLeft: '10px',
    marginTop: '10px',
})

const EmptyCoupons = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    rowGap: '5px',
})

const ButtonArea = styled('div')({
    display: 'flex',
    columnGap: '10px',
    width: '100%',
    marginTop: '10px',
})

const Button = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    border: 'unset',
    borderRadius: '10px',
    backgroundColor: 'black',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    color: 'white',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    letterSpacing: '2px',
    fontSize: '1em',
    cursor: 'pointer',
})