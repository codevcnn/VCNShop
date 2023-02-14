import React, { useMemo, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import CommentIcon from '@mui/icons-material/Comment'
import { useSelector } from "react-redux"
import { Rating } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import Pagination from '@mui/material/Pagination'
import CircularProgress from "@mui/material/CircularProgress"
import ReviewImages from "./review_images"

const options_icon_style = {
    fontSize: '0.8em',
    cursor: 'pointer',
}

const Reviews = () => {
    const { product } = useSelector(({ productDetail }) => productDetail)
    const [reviewPage, setCommentPage] = useState(1)
    const [reviewPageDelay, setCommentPageDelay] = useState(false)
    const switch_review_page_ref = useRef()

    const reviewSection = useMemo(() => {
        if (product && product.review)
            return product.review.reviews.slice(
                (reviewPage - 1) * 5,
                (reviewPage - 1) * 5 + 5
            )
    }, [product, reviewPage])

    const switchCommentPage = (e, page) => {
        if (page === reviewPage) return
        switch_review_page_ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', })
        setCommentPageDelay(true)
        setTimeout(() => {
            setCommentPageDelay(false)
            setCommentPage(page)
        }, 500)
    }

    return (
        <ReviewsArea id="Reviews" ref={switch_review_page_ref}>
            <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                <CommentIcon />
                <ReviewsTitle>Reviews</ReviewsTitle>
            </div>

            <Hr />

            {reviewPageDelay &&
                <CircularProgress size={40} thickness={6}
                    sx={{ margin: '20px auto 10px', color: 'black' }}
                />
            }

            {reviewSection && reviewSection.length > 0 ?
                !reviewPageDelay &&
                reviewSection.map(({ name, username, comment, rating,
                    title, createdOn, avatar, imageURLs }) =>
                    <CommentContainer key={username}>
                        <Date>
                            <span>Writed On </span>
                            <span>{new window.Date(createdOn).toLocaleDateString()}</span>
                        </Date>
                        <UserInfoContainer>
                            <AvatarWrapper>
                                <Avatar src={avatar} />
                            </AvatarWrapper>
                            <Info>
                                <Name>{name}</Name>
                                <Username>{'@' + username}</Username>
                            </Info>
                        </UserInfoContainer>
                        <Rating value={rating} readOnly size="small" precision={0.5} />
                        <CommentTitle>{title}</CommentTitle>
                        <Comment>{comment}</Comment>
                        <ReviewImages imageURLs={imageURLs} />
                        <IsHelpful>
                            <span className="title">Was This Review Helpful ?</span>
                            <div title="Helpful"
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <ThumbUpIcon sx={options_icon_style} />
                                <ThumbUpCount>{0}</ThumbUpCount>
                            </div>
                            <div title="Unhelpful"
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <ThumbDownIcon sx={options_icon_style} />
                                <ThumbUpCount>{0}</ThumbUpCount>
                            </div>
                        </IsHelpful>
                    </CommentContainer>
                )
                :
                <EmptyReviews>
                    <CommentIcon sx={{ height: '2em', width: '2em' }} />
                    <EmptyReviewsText>
                        There's no one review...
                    </EmptyReviewsText>
                </EmptyReviews>
            }
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <ReviewPages
                    count={product && product.review ?
                        Math.ceil(product.review.reviews.length / 5) : 0
                    }
                    variant="outlined" shape="rounded"
                    onChange={switchCommentPage}
                    page={reviewPage}
                />
            </div>
        </ReviewsArea>
    )
}

export default Reviews

const ReviewsArea = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
}))

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

const CommentContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    padding: '10px',
    backgroundColor: '#e0f9ff',
    borderBottom: '2px gray solid',
    position: 'relative',
    marginTop: '10px',
})

const Date = styled('div')({
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.9em',
    position: 'absolute',
    top: '10px',
    right: '10px',
})

const UserInfoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    width: 'fit-content',
    cursor: 'pointer',
    paddingRight: '5px',
})

const AvatarWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '50%',
    height: 'fit-content',
})

const Avatar = styled('img')({
    height: '40px',
    width: '40px',
})

const Info = styled('div')({

})

const Name = styled('h2')({
    fontFamily: '"Work Sans", sans-serif',
    margin: '0',
    fontSize: '1em',
})

const Username = styled('div')({
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.8em',
})

const CommentTitle = styled('h2')({
    fontFamily: '"Work Sans", sans-serif',
    margin: '0',
    marginLeft: '5px',
    fontSize: '1.1em',
})

const Comment = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    paddingLeft: '5px',
})

const IsHelpful = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    marginTop: '5px',
    '& span.title': {
        fontFamily: '"Work Sans", sans-serif',
        fontSize: '0.8em',
        marginLeft: '10px',
    }
})

const ThumbUpCount = styled('span')({
    fontFamily: '"Work Sans", sans-serif',
    fontSize: '0.8em',
    marginLeft: '3px',
})

const EmptyReviews = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '5px',
    backgroundColor: '#f0f0f0',
    height: '35vh',
    width: '100%',
})

const EmptyReviewsText = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.2em',
})

const ReviewPages = styled(Pagination)({
    marginTop: '20px',
    '& button.MuiPaginationItem-root': {
        backgroundColor: '#c4f9ff',
        border: '1.5px black solid',
        color: 'black',
        '&:hover': {
            border: '1.5px #c4f9ff solid',
        },
        '&.Mui-selected': {
            border: '2px #c4f9ff solid',
            '&:hover': {
                backgroundColor: '#c4f9ff',
            }
        },
        '&.Mui-disabled': {
            opacity: '0.5',
        },
        '& span.MuiTouchRipple-root': {
            display: 'none',
        }
    }
})