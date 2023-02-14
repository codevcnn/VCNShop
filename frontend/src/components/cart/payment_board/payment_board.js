import React, { useMemo, useState } from "react"
import { styled } from '@mui/material/styles'
import AddBoxIcon from '@mui/icons-material/AddBox'
import paypal_checkout from '../../../assets/images/cart/paypal.svg'
import CouponBoard from "../coupon_board/coupon_board"
import PaymentType from "./payment_type"

const RenderPaymentType = (title, in_numbers, in_words) => (
    <PaymentType title={title} in_numbers={in_numbers} in_words={in_words} />
)

const convertNumberToWords = (number, currency = 'USD') => {
    let oneToTwenty = [
        '', 'one ', 'two ', 'three ', 'four ', 'five ',
        'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ',
        'twelve ', 'thirteen ', 'fourteen ', 'fifteen ',
        'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ',
    ]
    let tenth = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty',
        'sixty', 'seventy', 'eighty', 'ninety',
    ]

    number = `${number}`

    let dot_index = number.indexOf('.')
    let remainder = ''
    let remainder_in_words = ''

    if (dot_index >= 0) {
        remainder = number.slice(dot_index + 1, number.length)
        remainder_in_words = tenth[remainder[0] * 1] + (oneToTwenty[remainder[1] * 1] ?
            oneToTwenty[remainder[1] * 1] : '')
        number = number.slice(0, dot_index)
    }

    if (number.length > 7) return 'over'

    let matcher = `0000000${number}`.slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/)
    if (!matcher) return null

    let words = ''

    words += matcher[1] * 1 !== 0 ? (oneToTwenty[matcher[1] * 1] ||
        `${tenth[matcher[1][0]]} ${oneToTwenty[matcher[1][1]]}`) + 'million ' : ''
    words += matcher[2] * 1 !== 0 ? (oneToTwenty[matcher[2] * 1] ||
        `${tenth[matcher[2][0]]} ${oneToTwenty[matcher[2][1]]}`) + 'hundred ' : ''
    words += matcher[3] * 1 !== 0 ? (oneToTwenty[matcher[3] * 1] ||
        `${tenth[matcher[3][0]]} ${oneToTwenty[matcher[3][1]]}`) + 'thousand ' : ''
    words += matcher[4] * 1 !== 0 ? (oneToTwenty[matcher[4] * 1] ||
        `${tenth[matcher[4][0]]} ${oneToTwenty[matcher[4][1]]}`) + 'hundred ' : ''
    words += matcher[5] * 1 !== 0 ? (oneToTwenty[matcher[5] * 1] ||
        `${tenth[matcher[5][0]]} ${oneToTwenty[matcher[5][1]]}`) : ''
    if (number * 1 === 0)
        words += 'zero'

    if (currency === 'USD') {
        words += number * 1 > 1 ? ' dollars' : ' dollar'
    }

    if (remainder.length > 0)
        words += ` and ${remainder_in_words} ${remainder * 1 > 1 ? ' cents' : ' cent'}`

    return words
}

const PaymentBoard = () => {
    const [openCouponBoard, setOpenCouponBoard] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [tax, setTax] = useState(0)
    const [reduceAmount, setReduceAmount] = useState(0)

    const subTotalInWords =
        useMemo(() => convertNumberToWords(subtotal), [subtotal])
    const shippingFeeInWords =
        useMemo(() => convertNumberToWords(shippingFee), [shippingFee])
    const taxInWords =
        useMemo(() => convertNumberToWords(tax), [tax])
    const totalInWords =
        useMemo(
            () => convertNumberToWords(subtotal + shippingFee + tax),
            [subtotal, shippingFee, tax]
        )

    const handleOpenCouponBoard = (open) => {
        setOpenCouponBoard(open)
    }

    const total = useMemo(() => subtotal + shippingFee + tax, [subtotal, shippingFee, tax])

    return (
        <PaymenBoardArea id="PaymenBoardArea">

            <CouponBoard openCouponBoard={openCouponBoard}
                handleOpenCouponBoard={handleOpenCouponBoard}
            />

            <PaymentBoardTitle>SUMMARY</PaymentBoardTitle>
            <Hr />
            <CouponContainer>
                <CouponTitle>COUPONS</CouponTitle>
                <HelperText>
                    Enter your promode code or add an existing promode code
                    by click at the plus button
                </HelperText>
                <InputContainer>
                    <CouponInput //input
                        name="promode_code"
                        placeholder="Enter your promode code here..."
                    />
                    <AddBoxIconWrapper title="Add an existing promode code"
                        onClick={() => handleOpenCouponBoard(true)}
                    >
                        <StyledAddBoxIcon />
                    </AddBoxIconWrapper>
                </InputContainer>
                <div style={{
                    display: 'flex',
                    marginTop: '5px',
                }}>
                    <GetCouponBtn>
                        Get Coupon
                    </GetCouponBtn>
                </div>
                <CouponResults>

                </CouponResults>
            </CouponContainer>
            <Hr />
            {RenderPaymentType('SUBTOTAL', subtotal, subTotalInWords)}
            {RenderPaymentType('SHIPPING FEE', shippingFee, shippingFeeInWords)}
            {RenderPaymentType('TAX', tax, taxInWords)}
            <Hr sx={{ height: '3px', }} />
            {RenderPaymentType('TOTAL', total, totalInWords)}
            <CheckoutBtn>
                Check Out
            </CheckoutBtn>
            <PaypalCheckoutBtn title="Pay via Paypal">
                <PaypalImg src={paypal_checkout} alt="Paypal" />
            </PaypalCheckoutBtn>
        </PaymenBoardArea>
    )
}

export default PaymentBoard

const PaymenBoardArea = styled('div')({
    padding: '10px 20px',
    backgroundColor: 'lightcyan',
    width: '34%',
    height: 'fit-content',
    boxSizing: 'border-box',
})

const PaymentBoardTitle = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    transform: 'scaleY(0.8)',
    margin: '0',
})

const Hr = styled('hr')({
    backgroundColor: 'black',
    borderWidth: '0',
    height: '1.5px',
})

const CouponContainer = styled('div')({

})

const CouponTitle = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    transform: 'scaleY(0.8)',
    margin: '0',
})

const HelperText = styled('p')({
    fontSize: '0.9em',
    fontFamily: '"Nunito", "sans-serif"',
    margin: '0',
})

const InputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5px',
    columnGap: '6px',
})

const CouponInput = styled('input')({
    border: '1.5px white solid',
    outline: 'unset',
    boxSizing: 'border-box',
    padding: '7px 10px',
    fontSize: '1em',
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
        outline: '3px black solid',
    },
    '&:focus': {
        outline: '3px black solid',
    },
    '::placeholder': { //Chrome, Firefox, Opera, Safari 10.1+
        color: '#a1a1a1',
        opacity: '1', //Firefox
    },
    ':-ms-input-placeholder': { //Internet Explorer 10-11
        color: '#a1a1a1',
    },
    '::-ms-input-placeholder': { //Microsoft Edge
        color: '#a1a1a1',
    }
})

const AddBoxIconWrapper = styled('div')({
    display: 'flex',
    cursor: 'pointer',
})

const StyledAddBoxIcon = styled(AddBoxIcon)({
    width: '1.6em',
    height: '1.6em',
    margin: 'auto',
})

const GetCouponBtn = styled('button')({
    border: 'unset',
    backgroundColor: 'black',
    padding: '5px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    color: 'white',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    margin: 'auto',
})

const CouponResults = styled('span')({
    display: 'block',
})

const CheckoutBtn = styled('button')({
    backgroundColor: 'black',
    padding: '10px',
    color: 'white',
    cursor: 'pointer',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1em',
    marginTop: '10px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '20px',
    border: '1.5px lightcyan solid',
    '&:hover': {
        outline: '3px black solid',
    }
})

const PaypalCheckoutBtn = styled(CheckoutBtn)({
    padding: '8px',
    height: '45px',
})

const PaypalImg = styled('img')({
    height: '100%',
    '&:hover': {
        '& svg': {

            fill: 'black',
        }
    }
})