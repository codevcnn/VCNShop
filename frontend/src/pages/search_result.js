import React, { useEffect, useRef } from "react"
import { styled } from '@mui/material/styles'
import Header from "../components/search_result/header"
import { useParams } from "react-router-dom"
import { getProducts } from '../store/actions/product_actions'
import { useDispatch, useSelector } from 'react-redux'
import Products from "../components/search_result/products"
import Skeleton from '@mui/material/Skeleton'
import Filter from "../components/search_result/filter"
import HelpChat from '../components/help_chat'
import ScrollToTopBtn from '../components/scroll_top_top_btn'
import { Grid } from "@mui/material"

const RenderProductLoadings = () => {
    return (
        <div style={{ marginRight: '15px', width: '100%' }}>
            <ProductLoadings
                container
                columns={{ xs: 12 }}
                columnSpacing={{ xs: 1.5 }}
                rowSpacing={{ xs: 2 }}
            >
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                        <Grid item key={value} xs={3}>
                            <ProductLoading animation="wave" />
                        </Grid>
                    ))
                }
            </ProductLoadings>
        </div>
    )
}

const SearchResult = () => {
    const { products, loading, error, filterLoading, isFiltered } =
        useSelector(({ products }) => products.productsSearch)
    const { keyword } = useParams()
    const dispatch = useDispatch()
    const ProductsArea_ref = useRef()

    useEffect(() => {
        dispatch(getProducts(50, false, keyword))
    }, [dispatch])

    return (
        <SearchResultArea id="SearchResultArea">
            <Header keyword={keyword} resultCount={products.length} />

            {
                loading ? (
                    <LoadingContainer>
                        <FilterLoading animation="wave" />
                        {RenderProductLoadings()}
                    </LoadingContainer>
                ) : error ? (
                    <Error>{error.message}</Error>
                ) : products &&
                <ResultArea ref={ProductsArea_ref}>
                    <Filter isFiltered={isFiltered} keyword={keyword} />
                    {
                        filterLoading ?
                            RenderProductLoadings()
                            :
                            <Products
                                products={products}
                                ProductsAreaRef={ProductsArea_ref}
                            />
                    }
                </ResultArea>
            }

            <HelpChat />
            <ScrollToTopBtn />
        </SearchResultArea>
    )
}

export default SearchResult

const SearchResultArea = styled('div')(({ theme }) => ({

}))

const LoadingContainer = styled('div')({
    display: 'flex',
    columnGap: '20px',
    marginTop: '20px',
})

const FilterLoading = styled(Skeleton)({
    width: '25%',
    height: '500px',
    transform: 'unset',
})

const ProductLoadings = styled(Grid)({

})

const ProductLoading = styled(Skeleton)({
    width: '100%',
    height: '333px',
    transform: 'unset',
})

const Error = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    color: 'red',
    width: '100%',
    textAlign: 'center',
})

const ResultArea = styled('div')({
    display: 'flex',
    columnGap: '20px',
    marginTop: '20px',
    paddingTop: '10px',
})