import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import RateReviewIcon from '@mui/icons-material/RateReview'
import Rating from '@mui/material/Rating'

const ScoreCard = ({ commentTitleRef }) => {
    const { product } = useSelector(({ productDetail }) => productDetail)

    const rating_bars = useMemo(() => {
        let bars = [
            { id_for_key: 1, count: 0 },
            { id_for_key: 2, count: 0 },
            { id_for_key: 3, count: 0 },
            { id_for_key: 4, count: 0 },
            { id_for_key: 5, count: 0 },
        ]

        if (product && product.review) {
            let reviews = product.review.reviews
            reviews.map(({ rating }) => {
                if (rating === 5) return bars[0].count++
                if (rating >= 4) return bars[1].count++
                if (rating >= 3) return bars[2].count++
                if (rating >= 2) return bars[3].count++
                return bars[4].count++
            })
        }

        return bars
    }, [product])

    const average_rating_number = useMemo(() => {
        if (product && product.review) {
            let avg_rating = product.review.rating
            if (avg_rating === 0) return 0
            if (avg_rating > 4.5) return '5.0'
            if (avg_rating > 4) return '4.5'
            if (avg_rating > 3.5) return '4.0'
            if (avg_rating > 3) return '3.5'
            if (avg_rating > 2.5) return '3.0'
            if (avg_rating > 2) return '2.5'
            if (avg_rating > 1.5) return '2.0'
            if (avg_rating > 1) return '1.5'
            if (avg_rating > 0.5) return '1.0'
            return 0.5
        }
        return 0
    }, [product])

    const scrollIntoCommentTitle = () => {
        commentTitleRef.current.scrollIntoView({ behavior: 'auto', block: 'center' })
        commentTitleRef.current.focus()
    }

    return (
        <ScoreCardArea id="ScoreCardArea">
            <ScoreCardContainer>
                <AverageRatingContainer>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AverageRatingNumber>{average_rating_number}</AverageRatingNumber>
                        <Rating
                            value={average_rating_number * 1} precision={0.5}
                            readOnly size="large" sx={{ color: '#ff8888' }}
                        />
                    </div>
                    <BaseOn>
                        <span>{'Based On ' + product.review.count}</span>
                        <span>{product.review.count > 1 ? ' Reviews' : ' Review'}</span>
                    </BaseOn>
                </AverageRatingContainer>
                <div style={{ display: 'flex', columnGap: '6px', width: '100%', }}>
                    <RatingsContainer>
                        {[5, 4, 3, 2, 1].map((number) => (
                            <StyledRating value={number} readOnly key={number} />
                        ))}
                    </RatingsContainer>
                    <RatingBarsContainer>
                        {rating_bars.map(({ id_for_key, count }) => (
                            <RatingBars key={id_for_key}>
                                <RatingBar
                                    sx={{ width: (count / product.review.count) * 100 + '%' }}
                                >
                                    <div className="rating_bar"></div>
                                </RatingBar>
                                <div>{count}</div>
                            </RatingBars>
                        ))}
                    </RatingBarsContainer>
                </div>
            </ScoreCardContainer>

            <MakeAReviewButton
                title="Make a review"
                onClick={scrollIntoCommentTitle}
            >
                <RateReviewIcon sx={{ width: '0.9em', height: '0.9em' }} />
                <span>Make A Review</span>
            </MakeAReviewButton>
        </ScoreCardArea>
    )
}

export default ScoreCard

const ScoreCardArea = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '10px',
}))

const ScoreCardContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '20px',
    width: '75%',
    padding: '0 10px',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 5px grey',
    borderRadius: '5px',
    marginTop: '5px',
    border: '1px gray solid',
})

const AverageRatingContainer = styled('div')({

})

const AverageRatingNumber = styled('h2')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    marginRight: '5px',
})

const BaseOn = styled('p')({
    margin: '0',
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.9em',
})

const RatingsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    padding: '5px 0',
})

const StyledRating = styled(Rating)({
    color: '#ff8888',
})

const RatingBarsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    borderLeft: '2px #ff8888 solid',
    padding: '6px 0 5px',
    width: '100%',
})

const RatingBars = styled('div')({
    display: 'flex',
    columnGap: '8px',
    fontFamily: '"Nunito", "sans-serif"',
    alignItems: 'center',
})

const RatingBar = styled('div')({
    display: 'flex',
    alignItems: 'center',
    height: '1.51rem',
    '& div.rating_bar': {
        height: '70%',
        width: '100%',
        backgroundColor: '#ff8888',
    }
})

const MakeAReviewButton = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    width: 'fit-content',
    padding: '4px 7px',
    cursor: 'pointer',
    border: '1px #959595 solid',
    transition: 'box-shadow 0.2s',
    borderRadius: '3px',
    '& span': {
        fontFamily: '"Roboto", "sans-serif"',
        fontSize: '0.9em',
    },
    '&:hover': {
        boxShadow: '0px 0px 3px gray',
    }
})