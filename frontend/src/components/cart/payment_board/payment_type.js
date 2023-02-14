import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'

const PaymentType = ({ title, in_numbers, in_words }) => {
    const [inWordsDesc, setInWordsDesc] = useState('')

    useEffect(() => {
        if (in_words === 'over') {
            setInWordsDesc('Sorry, the payment amount must not exceed seven' +
                ' digits, max is 9,999,999 dollars.')
        } else {
            if (title === 'SUBTOTAL') {
                setInWordsDesc('Your orders cost')
            } else if (title === 'SHIPPING FEE') {
                setInWordsDesc('Your shipping fee is')
            } else if (title === 'TAX') {
                setInWordsDesc('Your have to pay')
            } else if (title === 'TOTAL') {
                setInWordsDesc('The total amount you have to pay is')
            }
        }
    })

    return (
        <div id="PaymentTypeContainer">
            <PaymentTypeContainer>
                <PaymentTypeTitle>
                    {title}
                </PaymentTypeTitle>
                <PaymentTypeCost>
                    ${in_numbers.toLocaleString('en', { useGrouping: true })}
                </PaymentTypeCost>
            </PaymentTypeContainer>
            {in_words === 'over' ?
                <InWords sx={{ color: 'red' }}>
                    <b>{inWordsDesc}</b>
                </InWords>
                :
                <InWords>
                    <span>{inWordsDesc}</span>
                    <b> {in_words}</b>
                    <span>{title === 'TAX' ? ' for tax.' : '.'}</span>
                </InWords>
            }
        </div>
    )
}

export default PaymentType

const PaymentTypeContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const PaymentTypeTitle = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    transform: 'scaleY(0.8)',
    margin: '0',
})

const PaymentTypeCost = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1em',
})

const InWords = styled('span')({
    display: 'block',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
})