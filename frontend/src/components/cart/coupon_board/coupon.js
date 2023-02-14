import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import vcn_coupon from '../../../assets/images/cart/coupon_new_member.jpg'
import CouponDetail from "./coupon_detail"

const Coupon = ({ coupon, pickCoupons, category, checked }) => {
    const { name, type, quantity, cost, img, apply_for, describe, code } = coupon

    const [openCouponDetail, setOpenCouponDetail] = useState(false)

    const currency = (cost_value) => {
        if (cost_value === 'USD') return '$'
        if (cost_value === 'percent') return '%'
    }

    const handleOpenCouponDetail = (open) => {
        setOpenCouponDetail(open)
    }

    return (
        <CouponArea>
            {
                openCouponDetail &&
                <CouponDetail
                    detail={coupon}
                    handleOpenCouponDetail={handleOpenCouponDetail}
                />
            }

            <CouponImg //img
                src={apply_for.all ? vcn_coupon : img}
                onClick={() => handleOpenCouponDetail(true)}
            />
            <CouponInfo>
                <CouponName onClick={() => handleOpenCouponDetail(true)}>
                    {name}
                </CouponName>
                <CouponDesc title={describe}>
                    {describe}
                </CouponDesc>
                <div style={{ display: 'flex', columnGap: '5px', }}>
                    <CouponType>
                        {type}
                    </CouponType>
                    <Amount title={`This coupon has ${quantity} left`}>
                        <span>Left: </span><b>{quantity}</b>
                    </Amount>
                </div>
            </CouponInfo>
            <Cost><span>{currency(cost.currency)}</span><span>{cost.value}</span></Cost>
            <CheckboxWrapper className="CheckboxWrapper">
                <PickCouponButton
                    type="radio"
                    name={category}
                    onChange={() => pickCoupons(category, code.id)}
                    checked={checked ? true : false}
                />
                <span className="pick_coupon_button_layout_wrapper">
                    <span className="pick_coupon_button_layout"></span>
                </span>
            </CheckboxWrapper>
        </CouponArea>
    )
}

export default Coupon

const CouponArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '30vw',
    padding: '10px',
    columnGap: '10px',
    border: '2px black solid',
    boxSizing: 'border-box',
})

const CouponImg = styled('img')({
    height: '70px',
    cursor: 'pointer',
})

const CouponInfo = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '55%',
})

const CouponName = styled('h2')({
    margin: '0',
    fontSize: '1em',
    fontFamily: 'Nunito',
    cursor: 'pointer',
    width: 'fit-content',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const CouponDesc = styled('p')({
    margin: '0',
    fontSize: '0.8em',
    fontFamily: 'Nunito',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
})

const CouponType = styled('div')({
    padding: '3px 8px',
    backgroundColor: 'pink',
    borderRadius: '5px',
    width: 'fit-content',
    fontSize: '0.8em',
    fontFamily: 'Nunito',
})

const Amount = styled(CouponType)({

})

const Cost = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '1em',
    padding: '10px',
    width: '50px',
    boxSizing: 'border-box',
    backgroundColor: 'pink',
})

const CheckboxWrapper = styled('div')({
    display: 'flex',
    position: 'relative',
    '& span.pick_coupon_button_layout_wrapper': {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'absolute',
        '& span.pick_coupon_button_layout': {
            width: '1.2em',
            height: '1.2em',
            backgroundColor: 'unset',
            border: '2px black solid',
            boxSizing: 'border-box',
            padding: '2.5px',
            margin: 'auto',
            zIndex: '1',
            borderRadius: '50%',
            backgroundClip: 'content-box',
        }
    },
})

const PickCouponButton = styled('input')({
    width: '1.4em',
    height: '1.4em',
    margin: 'auto',
    cursor: 'pointer',
    position: 'relative', //set relative for set zindex higher span layout
    zIndex: '2',
    opacity: '0',
    '&:checked ~ span.pick_coupon_button_layout_wrapper': {
        '& span.pick_coupon_button_layout': {
            backgroundColor: 'black',
        }
    },
    '&.active': {

    }
})