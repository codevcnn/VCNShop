import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from "@mui/material/Collapse"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch } from "react-redux"
import { getProducts } from "../../store/actions/product_actions"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const category = {
    clothing: ['Shirt', 'Pants',],
    accessories: ['Necklace', 'Ring',],
    shoes: ['Sneaker',],
}

const Filter = ({ isFiltered, keyword }) => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm()
    const [filterCollapse, setFilterCollapse] = useState({
        Category: true, Rating: true, Price: true,
    })
    const [ratingValue, setRatingValue] = useState(0)
    const dispatch = useDispatch()

    const submitFilter = (filterData, e) => {
        if (filterData.priceFilter && filterData.priceFilter * 1 > 25000) {
            setError('priceFilter')
            return toast.warning('Can\'t apply, please check again')
        }
        dispatch(getProducts(
            100, filterData.categoryName, keyword, filterData.rating, 0,
            filterData.priceFilter ? [filterData.priceFilter, 25000] : [0, 25000], true,
        ))
    }

    const expandMoreFilterTab = (tab_title) => {
        setFilterCollapse(pre => ({ ...pre, [tab_title]: !pre[tab_title] }))
    }

    const switchRatingValue = (e, newValue) => {
        setRatingValue(newValue)
        submitFilter({ rating: newValue })
    }

    const RenderFilterTitle = (title) => (
        <FilterTitle onClick={() => expandMoreFilterTab(title)}>
            <span>{title}</span>
            <ExpandMoreIcon sx={{
                transition: 'transform 0.2s',
                transform: filterCollapse[title] ? 'rotate(-90deg)' : 'rotate(0deg)',
            }} />
        </FilterTitle>
    )

    const RenderCategoryItem = (text, categoryName) => (
        <CatgoryItem key={text}>
            <Checkbox
                color="default"
                onChange={(e) => submitFilter({
                    catgoryItem: text,
                    categoryName,
                })}
                sx={{ padding: '0', color: 'black' }}
            />
            <span>{text}</span>
        </CatgoryItem>
    )

    return (
        <FilterArea id="ProductsFilterArea"
            onSubmit={handleSubmit(submitFilter)}
        >
            <Title>
                <FilterAltIcon /><span>Filter</span>
                {
                    isFiltered &&
                    <CheckCircleIcon sx={{
                        color: 'green', marginLeft: '3px', fontSize: '0.9em'
                    }} />
                }
            </Title>

            <CategoryFilter>
                {RenderFilterTitle('Category')}
                <StyledCollapse in={filterCollapse.Category}>
                    <CategoryItemTitle>Clothing</CategoryItemTitle>
                    {category.clothing.map((text) => (
                        RenderCategoryItem(text, 'Clothing')
                    ))}
                    <CategoryItemTitle>Accessories</CategoryItemTitle>
                    {category.accessories.map((text) => (
                        RenderCategoryItem(text, 'Accessories')
                    ))}
                    <CategoryItemTitle>Sneaker</CategoryItemTitle>
                    {category.shoes.map((text) => (
                        RenderCategoryItem(text, 'Shoes')
                    ))}
                </StyledCollapse>
            </CategoryFilter>

            <Hr />

            <RatingFilter>
                {RenderFilterTitle('Rating')}
                <StyledCollapse in={filterCollapse.Rating}>
                    <Rating
                        value={ratingValue} precision={0.5}
                        onChange={switchRatingValue}
                    />
                    <RatingFilterText>
                        {'From ' + ratingValue + (ratingValue > 1 ? ' stars' : ' star')}
                    </RatingFilterText>
                </StyledCollapse>
            </RatingFilter>

            <Hr />

            <PriceFilter>
                {RenderFilterTitle('Price')}
                <StyledCollapse in={filterCollapse.Price}>
                    <PriceFilterText>
                        You're searching products with price from:
                    </PriceFilterText>
                    <PriceFilterInputContainer>
                        <PriceFilterInput
                            maxLength={5}
                            {...register('priceFilter', {
                                required: true,
                                pattern: /^[0-9]{1,5}$/,
                            })}
                        />
                        <Currency>USD</Currency>
                    </PriceFilterInputContainer>
                    {errors.priceFilter &&
                        <PriceWarning>
                            Please enter a number smaller than or equal 25000.
                        </PriceWarning>
                    }
                    <PriceApplyButton>
                        Apply
                    </PriceApplyButton>
                </StyledCollapse>
            </PriceFilter>
        </FilterArea>
    )
}

export default Filter

const FilterTitle = styled('h2')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
    fontSize: '1.2em',
    fontFamily: '"Nunito","sans-serif"',
    padding: '10px',
    paddingLeft: '15px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#e1eeff',
    },
})

const CategoryItemTitle = styled('h2')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Nunito","sans-serif"',
    marginTop: '3px',
})

const CatgoryItem = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontFamily: '"Nunito","sans-serif"',
    paddingLeft: '5px',
    marginTop: '3px',
})

const FilterArea = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    width: '25%',
    height: 'fit-content',
    padding: '15px',
    borderRight: '1px #939393 solid',
}))

const Title = styled('h2')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontFamily: '"Work Sans", sans-serif',
    borderBottom: '1px #939393 solid',
    margin: '0',
    paddingBottom: '10px',
})

const CategoryFilter = styled('div')({

})

const StyledCollapse = styled(Collapse)({
    padding: '0 15px',
    paddingLeft: '25px',
})

const Hr = styled('div')({
    height: '0.5px',
    backgroundColor: '#939393',
    width: '100%',
})

const RatingFilter = styled('div')({

})

const RatingFilterText = styled('p')({
    margin: '0',
    fontFamily: '"Nunito","sans-serif"',
    fontSize: '0.9em',
    marginLeft: '5px',
})

const PriceFilter = styled('div')({

})

const PriceFilterText = styled('p')({
    margin: '0',
    fontFamily: '"Nunito","sans-serif"',
})

const PriceFilterInputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    columnGap: '5px',
})

const PriceFilterInput = styled('input')({
    outline: 'unset',
    width: '100%',
    padding: '5px 10px',
    boxSizing: 'border-box',
    border: '1px gray solid',
})

const Currency = styled('span')({
    fontFamily: '"Nunito","sans-serif"',
})

const PriceWarning = styled('span')({
    display: 'block',
    fontFamily: '"Nunito","sans-serif"',
    color: 'red',
    marginTop: '3px',
})

const PriceApplyButton = styled('button')({
    width: '100%',
    padding: '5px 10px',
    backgroundColor: 'black',
    color: 'white',
    marginTop: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'pink',
        color: 'black',
    },
    '&:active': {
        backgroundColor: 'black',
        color: 'white',
    }
})