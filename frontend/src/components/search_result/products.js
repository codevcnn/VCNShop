import React, { useMemo, useState } from "react"
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import ProductCard from "./product_card"
import CircularProgress from "@mui/material/CircularProgress"
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

const Products = ({ products, ProductsAreaRef }) => {
    const [productsPage, setProductsPage] = useState(1)
    const [switchPageDelay, setSwitchPageDelay] = useState(false)

    const productSection = useMemo(() => {
        return products.slice((productsPage - 1) * 100, (productsPage - 1) * 100 + 100)
    }, [products, productsPage])

    const switchProductsPage = (e, page) => {
        if (page === productsPage) return
        ProductsAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', })
        setSwitchPageDelay(true)
        setTimeout(() => {
            setSwitchPageDelay(false)
            setProductsPage(page)
        }, 300)
    }

    return (
        <ProductsArea id="ProductsArea">
            <ProductContainer
                container
                columns={{ xs: 12 }}
                columnSpacing={{ xs: 1.5 }}
                rowSpacing={{ xs: 2 }}
            >

                {
                    switchPageDelay &&
                    <CircularProgress
                        size={45}
                        thickness={6}
                        sx={{ margin: '20px auto', color: 'black' }}
                    />
                }

                {
                    !switchPageDelay &&
                        productSection && productSection.length > 0 ?
                        productSection.map((product) => (
                            <ProductCardWrapper
                                key={product._id}
                                item
                                xs={3}
                            >
                                <ProductCard product={product} />
                            </ProductCardWrapper>
                        ))
                        :
                        !switchPageDelay &&
                        <EmptyProductsContainer>
                            <HeartBrokenIcon sx={{ fontSize: '3.8em' }} />
                            <EmptyProductsText>
                                Oops!! No Result For Your Search...
                            </EmptyProductsText>
                        </EmptyProductsContainer>
                }
            </ProductContainer>

            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <ReviewPages
                    count={products.length > 0 ? Math.ceil(products.length / 100) : 0}
                    variant="outlined"
                    shape="rounded"
                    onChange={switchProductsPage}
                    page={productsPage}
                />
            </div>
        </ProductsArea>
    )
}

export default Products

const ProductsArea = styled('div')(({ theme }) => ({
    width: '100%',
    paddingRight: '15px',
}))

const ProductContainer = styled(Grid)({

})

const ProductCardWrapper = styled(Grid)({

})

const EmptyProductsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '15px',
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    border: '5px #dddddd solid',
    boxSizing: 'border-box',
    marginTop: '16px',
    marginLeft: '12px',
})

const EmptyProductsText = styled('p')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.2em',
})

const ReviewPages = styled(Pagination)({
    marginTop: '30px',
    '& button.MuiPaginationItem-root': {
        backgroundColor: 'black',
        border: '1.5px black solid',
        color: 'white',
        '&:hover': {
            border: '2px white solid',
        },
        '&.Mui-selected': {
            border: '2px white solid',
            backgroundColor: '#ffa4a4',
            color: 'black',
        },
        '&.Mui-disabled': {
            opacity: '0.5',
        },
        '& span.MuiTouchRipple-root': {
            display: 'none',
        }
    }
})