import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { addProductToCart } from "../../../store/actions/cart_actions"
import Options from "./options"
import Images from "./images"
import Price from "./price"
import TopDeatil from "./top_detail"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'

const ProductDetail = ({ product }) => {
    const dispatch = useDispatch()
    const [choices, setChoices] = useState({ color: undefined, size: undefined })

    const addToCart = (product_id) => {
        if (!choices.color || !choices.size)
            return toast.warn('Please choose both color and size!')

        dispatch(addProductToCart(product_id, choices))
        toast.success('Add to cart successfully!')
    }

    const choicesSetting = (choice_name, choice_value) => {
        setChoices(pre => ({ ...pre, [choice_name]: choice_value }))
    }

    return (
        <ProductDetailContainer id="ProductDetailContainer">
            <Images images={product.images} image_link={product.image_link} />

            <DetailContainer>

                <TopDeatil />

                <Options //options
                    colors={product.options.color}
                    sizes={product.options.size}
                    choicesSetting={choicesSetting}
                />

                <Price //Price
                    product={product}
                />

                <Decision title="Add this product to cart"
                    onClick={() => addToCart(product._id)}
                >
                    <AddShoppingCartIcon className="AddToCartIcon"
                        sx={{ color: 'white' }}
                    />
                    <span>Add to cart</span>
                </Decision>

                <AddCoupons>
                    <ConfirmationNumberIcon />
                    <span>Collect Coupons</span>
                </AddCoupons>
            </DetailContainer>
        </ProductDetailContainer>
    )
}

export default ProductDetail

const ProductDetailContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    columnGap: '20px',
    justifyContent: 'space-between',
    marginTop: '15px',
}))

const DetailContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    width: '39%',
    boxSizing: 'border-box',
    padding: '20px 0',
})

const Decision = styled('button')({
    fontFamily: '"Nunito", "sans-serif"',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '10px',
    cursor: 'pointer',
    padding: '5px 20px',
    transition: 'background-color 0.2s',
    borderRadius: '20px',
    backgroundColor: 'black',
    '& span': {
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: 'white',
    },
    '&:hover': {
        backgroundColor: 'pink',
        '& span , .AddToCartIcon': {
            color: 'black',
        }
    }
})

const AddCoupons = styled('button')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    columnGap: '8px',
    fontSize: '0.9em',
    cursor: 'pointer',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    backgroundColor: 'bisque',
    border: '1px black solid',
    borderRadius: '3px',
    '&:hover': {
        backgroundColor: '#ffeedb',
    },
    '&:active': {
        backgroundColor: '#ffdeb7',
    }
})