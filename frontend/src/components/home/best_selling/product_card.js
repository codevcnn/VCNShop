import React from "react"
import { styled } from '@mui/material/styles'
import { useDispatch } from "react-redux"
import { addProductToCart } from "../../../store/actions/cart_actions"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const icon_option_bar_style = {
    height: '1em',
    width: '1em',
    fill: 'white',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const ProductCard = ({ product }) => {
    const { _id, name, image_link, review, price, shop, sold } = product
    const dispatch = useDispatch()

    const iconAction = (type) => {
        if (type === 'Wishlist') {

        }
        if (type === 'Cart') {
            dispatch(addProductToCart(_id))
            return toast.success('Add product to cart successfully!')
        }
        if (type === 'Hidden') {

        }
    }

    return (
        <ProductCardsContainer>
            <ImgContainer elevation={3}>
                <ImgWrapper to={`/productDetail/${_id}`}>
                    <Img src={image_link} alt="Can't load"
                        loading="lazy"
                    />
                </ImgWrapper>
                <OptionBar className="OptionBar">
                    <FavoriteBorderIcon
                        titleAccess="Add To Wishlist"
                        sx={icon_option_bar_style}
                        onClick={() => iconAction('Wishlist')}
                    />
                    <AddShoppingCartIcon
                        titleAccess="Add To Cart"
                        sx={icon_option_bar_style}
                        onClick={() => iconAction('Cart')}
                    />
                    <ErrorOutlineIcon
                        titleAccess="Hidden"
                        sx={icon_option_bar_style}
                        onClick={() => iconAction('Hidden')}
                    />
                </OptionBar>
            </ImgContainer>
            <ProductInfo>
                <Name title={name} to={`/productDetail/${_id}`}>
                    {name}
                </Name>
                <RatingContainer>
                    <Rating name="half-rating-read" defaultValue={0}
                        precision={0.2} readOnly value={review.rating}
                        size="small" sx={{ color: '#ff2222', }}
                    />
                    <RatingNumber>
                        {review.rating > 0.2 ? review.rating : 0}
                    </RatingNumber>
                    <RatingCount>
                        ({review.count.toLocaleString('en', { useGrouping: true })})
                    </RatingCount>
                </RatingContainer>
                <SoldCount>
                    {'Sold: ' + sold.count}
                </SoldCount>
                <Price>
                    {'$' + price.value}
                </Price>
                <ShopName>
                    {shop.name}
                </ShopName>
            </ProductInfo>
        </ProductCardsContainer>
    )
}

export default ProductCard

const ProductCardsContainer = styled('div')({
    padding: '10px',
    width: '100%',
    backgroundColor: '#ffcbcb',
    borderRadius: '10px',
    boxSizing: 'border-box',
})

const ImgContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    border: '2px white solid',
    overflow: 'hidden',
    '&:hover': {
        outline: '3px black solid',

        '& .OptionBar': {
            bottom: '0',
        },
    },
})

const ImgWrapper = styled(Link)({
    display: 'flex',
    width: '100%',
})

const OptionBar = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    padding: '7px 20px',
    backgroundColor: '#00000061',
    position: 'absolute',
    bottom: '-30%',
    left: '0',
    transition: 'bottom 0.3s',
})

const Img = styled('img')({
    width: '100%',
    height: '270px',
})

const ProductInfo = styled('div')({
    paddingLeft: '5px',
    paddingRight: '5px',
})

const Name = styled(Link)({
    display: 'block',
    color: 'black',
    textDecoration: 'unset',
    width: 'fit-content',
    maxWidth: '100%',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1rem',
    marginTop: '10px',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const RatingContainer = styled('div')({
    display: 'flex',
    columnGap: '5px',
})

const RatingNumber = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9rem',
})

const RatingCount = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9rem',
})

const SoldCount = styled('div')({
    fontFamily: 'cursive',
    color: 'grey',
    fontSize: '0.9em',
    fontWeight: 'bold',
})

const Price = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9rem',
    marginTop: '5px',
    paddingLeft: '5px',
    backgroundColor: 'white',
    borderRadius: '5px',
})

const ShopName = styled('div')({
    width: 'fit-content',
    maxWidth: '100%',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9rem',
    marginTop: '5px',
    paddingLeft: '5px',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
        textDecoration: 'underline',
    }
})