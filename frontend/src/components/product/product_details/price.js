import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'

const nunito_font = {
    fontFamily: '"Nunito", "sans-serif"',
}

const ShopAndPrice = ({ product }) => {

    const current_price = useMemo(() => {
        if (product.price) {
            let current = product.price.value
            let sale_off = product.sale.off
            let percent_index = sale_off.indexOf('%')
            if (percent_index > 0) {
                return (current - (sale_off.slice(0, percent_index) * 0.01 * current))
                    .toFixed(2) * 1
            }
            let new_price = sale_off.indexOf('new')
            if (new_price > 0) {
                return sale_off.slice(3, sale_off.length) * 1
            }
            return current - (sale_off * 1)
        }
        return {}
    }, [product])

    const sale_off_text = useMemo(() => {
        let sale_off = product.sale.off
        if (sale_off.indexOf('%') > 0) {
            return sale_off + ' Off'
        }
        return sale_off + ' dollars Off'
    }, [product])

    return (
        <Container id="ShopAndPrice">
            <Price>
                <Current title={`Cost ${product.price.value}`}>
                    <span>$</span>
                    <span>
                        {current_price
                            .toLocaleString('en', { useGrouping: true })
                        }
                    </span>
                </Current>
                {current_price < product.price.value &&
                    <>
                        <Original>
                            <span>$</span>
                            <span>
                                {product.price.value
                                    .toLocaleString('en', { useGrouping: true })
                                }
                            </span>
                        </Original>
                        <Off title={sale_off_text}>
                            {sale_off_text}
                        </Off>
                    </>
                }
            </Price>
        </Container>
    )
}

export default ShopAndPrice

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '30px',
    paddingRight: '10px',
})

const Price = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '8px',
})

const Current = styled('div')({
    ...nunito_font,
    fontSize: '1.8em',
    fontWeight: 'bold',
})

const Original = styled('div')({
    ...nunito_font,
    fontSize: '0.9em',
    textDecoration: 'line-through',
})

const Off = styled('div')({
    marginLeft: '5px',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    fontWeight: 'bold',
    backgroundColor: '#6ce26c',
    padding: '4px 9px',
})