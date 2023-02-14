import React from "react"
import { styled } from '@mui/material/styles'
import empty_cart from '../../../assets/images/cart/empty_cart.svg'
import { useSelector } from "react-redux"
import CircularProgress from '@mui/material/CircularProgress'
import loading_error from '../../../assets/images/error.svg'
import ProductCards from "./product_cards"
import { useNavigate } from 'react-router-dom'

const description_titles = [
    { title: 'Product', width: '20%', },
    { title: 'Detail', flex: '3', },
    { title: 'Quantity', flex: '1', },
    { title: 'Price', flex: '1', },
    { title: 'Remove', flex: '1', },
]

const ProductCardsBoard = () => {
    const { cartItems, loading, error } = useSelector(({ cart }) => cart)
    const navigate = useNavigate()

    const shoppingNow = () => {
        navigate('/')
    }

    return (
        <ProductCardsBoardArea id="ProductCardsBoardArea"
            sx={cartItems.length > 0 ? { height: 'fit-content' } : { height: 'auto' }}
        >
            <DescriptionsCard>
                {description_titles.map(({ title, flex, width }) => (
                    <DescriptionsTitle
                        title={title}
                        key={title}
                        sx={flex ? { flex } : { width }}
                    >
                        {title}
                    </DescriptionsTitle>
                ))}
            </DescriptionsCard>

            {loading ? (
                <Loading className="Loading">
                    <CircularProgress
                        sx={{ color: 'black' }}
                        size={35} thickness={6}
                    />
                    <LoadingText>
                        Loading...
                    </LoadingText>
                </Loading>
            ) : error ?
                <Error className="Error">
                    <ErrorImg src={loading_error} />
                    <ErrorText>
                        {error.message}
                    </ErrorText>
                </Error>
                :
                cartItems.length > 0 ?
                    cartItems.map((item) => (
                        <React.Fragment key={item._id}>
                            <ProductCards item={item} />
                        </React.Fragment>
                    ))
                    :
                    <EmptyCartContainer>
                        <EmptyImg src={empty_cart} />
                        <EmptyCartText>
                            THERE IS NO ITEM IN YOUR CART
                        </EmptyCartText>
                        <EmptyCartText className="desc">
                            Let's shop now and make up your cart!!
                        </EmptyCartText>
                        <EmptyCartBtn
                            onClick={() => shoppingNow()}
                        >
                            Shopping Now
                        </EmptyCartBtn>
                    </EmptyCartContainer>
            }
        </ProductCardsBoardArea>
    )
}

export default ProductCardsBoard

const ProductCardsBoardArea = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '65%',
    backgroundColor: '#f0f0f0',
}))

const DescriptionsCard = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: 'black',
    marginBottom: '10px',
})

const DescriptionsTitle = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.1em',
    textAlign: 'center',
    color: 'black',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '2px 0',
    boxSizing: 'border-box',
})

const Loading = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    rowGap: '10px',
})

const LoadingText = styled('p')({
    margin: '0',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    fontSize: '1.2em',
})

const Error = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
})

const ErrorImg = styled('img')({
    width: '10%',
    height: '10%',
})

const ErrorText = styled('p')({
    margin: '0',
    marginTop: '10px',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: '#ff6882',
})

const EmptyCartContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
})

const EmptyImg = styled('img')({
    height: '20vh',
})

const EmptyCartText = styled('p')({
    display: 'block',
    fontFamily: '"Kanit", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: '#323232',
    margin: '0',
    marginTop: '10px',
    '&.desc': {
        display: 'block',
        fontFamily: '"Nunito", "sans-serif"',
        fontWeight: 'bold',
        fontSize: '0.9em',
        marginTop: '0px',
    }
})

const EmptyCartBtn = styled('button')({
    padding: '10px 20px',
    borderRadius: '10px',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    fontSize: '1em',
    color: 'white',
    backgroundColor: 'black',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'transform 0.2s',
    textDecoration: 'unset',
    '&:hover': {
        transform: 'scale(1.05)',
    },
})