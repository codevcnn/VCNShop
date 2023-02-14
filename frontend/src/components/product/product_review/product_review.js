import React, { useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import ReviewsIcon from '@mui/icons-material/Reviews'
import Reviews from './reviews'
import { useDispatch, useSelector } from "react-redux"
import { newReview } from "../../../store/actions/product_actions"
import LoadingApp from "../../loading_app"
import ScoreCard from "./scorecard"
import AddImages from "./add_images"
import RatingSet from "./rating_set"
import { toast } from 'react-toastify'
import FileUploadFilter from "../../../utils/file_upload_filter"

const ProductReview = ({ product }) => {
    const { newReviewProcessing, newReviewMessage, error } = useSelector(({ productDetail }) => productDetail)
    const [commentTyping, setCommentTyping] = useState(false)
    const [review, setReview] = useState({ rating: 0, images: [] })
    const comment_title_ref = useRef()
    const comment_ref = useRef()
    const dispatch = useDispatch()

    const showMessageTypingAnimation = (show) => {
        setCommentTyping(show)
    }

    const submitReviews = () => {
        if (review.rating === 0 || comment_title_ref.current.value === '' ||
            comment_ref.current.value === '')
            return toast.warn('Please complete Rating and Title and Comment!')

        const images_data = new FormData()
        if (review.images.length > 0)
            for (let file of review.images) {
                let file_upload_filter = new FileUploadFilter(file)
                if (!file_upload_filter.mimetypeIsValid())
                    return toast.error(file_upload_filter.invalidMessage)
                if (!file_upload_filter.sizeIsValid())
                    return toast.error(file_upload_filter.invalidMessage)

                images_data.append('images', file)
            }

        dispatch(newReview({ //send request of review to server
            productId: product._id,
            rating: review.rating,
            title: comment_title_ref.current.value,
            comment: comment_ref.current.value,
            imagesData: images_data.has('images') ? images_data : null,
        }))

        //set review state to original
        setReview({ rating: 0, images: [] })
        comment_ref.current.value = ''
        comment_title_ref.current.value = ''
    }

    const changeImages = (images) => {
        images = images.map(({ file }) => file) //get "file" keys from object list
        setReview(pre => ({ ...pre, images }))
    }

    const handleSetRating = (rating) => {
        setReview(pre => ({ ...pre, rating }))
    }

    return (
        <ReviewsArea id="ReviewsArea">

            {
                newReviewProcessing &&
                <LoadingApp newReviewMessage={newReviewMessage} error={error} />
            }

            <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                <ReviewsIcon />
                <ReviewsTitle>Customer Reviews</ReviewsTitle>
            </div>

            <Hr />

            <ReviewsContainer>
                <ReviewOverview>Overview</ReviewOverview>
                <ScoreCard commentTitleRef={comment_title_ref} />

                <ReviewWriteComment>Make Review</ReviewWriteComment>

                <AddImages images={review.images} changeImages={changeImages} />

                <RatingSet ratingValue={review.rating} handleSetRatingValue={handleSetRating} />

                <CommentTitle
                    id="WriteCommentTitle"
                    ref={comment_title_ref}
                    maxLength={65}
                    placeholder="Write your title of comment here..."
                    onFocus={() => showMessageTypingAnimation(true)}
                    onBlur={() => showMessageTypingAnimation(false)}
                />

                <WriteComment //textarea
                    id="WriteCommentText"
                    ref={comment_ref}
                    placeholder="Write your comment here..."
                    rows={5} maxLength={200}
                    onFocus={() => showMessageTypingAnimation(true)}
                    onBlur={() => showMessageTypingAnimation(false)}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        {commentTyping &&
                            <MessageTypeAnimation>
                                <span className="dot one"></span>
                                <span className="dot two"></span>
                                <span className="dot three"></span>
                            </MessageTypeAnimation>
                        }
                    </div>
                    <SubmitCommentBtn onClick={submitReviews}>
                        Submit Review
                    </SubmitCommentBtn>
                </div>
            </ReviewsContainer>

            <Reviews />

        </ReviewsArea>
    )
}

export default ProductReview

const ReviewsArea = styled('div')({
    width: '56%',
})

const ReviewsTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.5em',
    transform: 'scaleY(0.9)',
})

const Hr = styled('div')({
    height: '2px',
    backgroundColor: 'black',
})

const ReviewsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    marginTop: '5px',
})

const ReviewOverview = styled('div')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.5em',
    transform: 'scaleY(0.9)',
    borderBottom: '2px black solid',
    fontWeight: 'bold',
    width: 'fit-content',
})

const ReviewWriteComment = styled(ReviewOverview)({

})

const CommentTitle = styled('input')({
    fontSize: '1em',
    fontFamily: '"Nunito", "sans-serif"',
    padding: '3px 15px',
    border: '1.5px black solid',
    outline: 'unset',
})

const WriteComment = styled('textarea')({
    outline: 'unset',
    padding: '5px 15px',
    fontSize: '1.1em',
    boxSizing: 'border-box',
    border: '1.5px black solid',
    width: '100%',
    fontFamily: '"Nunito", "sans-serif"',
    resize: 'vertical',
})

const MessageTypeAnimation = styled('div')({
    display: 'flex',
    columnGap: '3px',
    marginTop: '10px',
    marginLeft: '10px',
    '& .dot': {
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: '#9d9d9d',
        animation: 'wave 1s linear infinite',
        animationDelay: '-0.9s',
        '&.two': {
            animationDelay: '-0.7s',
        },
        '&.three': {
            animationDelay: '-0.6s',
        }
    },
    '@keyframes wave': {
        '0% , 60% , 100%': {
            transform: 'initial'
        },
        '30%': {
            transform: 'translateY(-8px)'
        }
    }
})

const SubmitCommentBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    border: '2px white solid',
    '&:hover': {
        outline: '2px black solid',
    }
})