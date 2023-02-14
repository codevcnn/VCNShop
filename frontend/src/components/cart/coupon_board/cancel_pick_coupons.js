import React from "react"
import { styled } from '@mui/material/styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CircularProgress from '@mui/material/CircularProgress'

const CancelPickCoupons = ({ amount, cancelPickCoupons, type, canceling }) => {
    return (
        <CancelPickCouponsArea id="CancelPickCouponsArea">
            {amount > 5 && <ThreeDotsIcon />}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                columnGap: '5px',
                width: '100%',
            }}>
                {amount > 5 &&
                    <ShowMoreBtn>
                        <ShowMoreIcon />
                        <span>Show More</span>
                    </ShowMoreBtn>
                }
                <CancelPickCouponBtn
                    onClick={() => cancelPickCoupons(type)}
                >
                    {canceling ?
                        <CircularProgress
                            sx={{ color: 'white', margin: 'auto', }}
                            size={20} thickness={6}
                        />
                        :
                        <>
                            <CancelPickCouponIcon />
                            <span>Cancel Pick</span>
                        </>
                    }
                </CancelPickCouponBtn>
            </div>
        </CancelPickCouponsArea>
    )
}

export default CancelPickCoupons

const CancelPickCouponsArea = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '5px',
    marginTop: '10px',
}))

const ThreeDotsIcon = styled(MoreHorizIcon)({
    color: 'black',
    width: '1.2em',
    height: '1.2em',
    marginTop: '-5px',
})

const ShowMoreBtn = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    fontSize: '1em',
    border: '2px white solid',
    cursor: 'pointer',
    padding: '5px 15px',
    width: 'fit-content',
    height: '36px',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
        outline: '2px black solid',
    }
})

const ShowMoreIcon = styled(VisibilityIcon)({
    width: '0.8em',
    height: '0.8em',
    color: 'white',
})

const CancelPickCouponBtn = styled(ShowMoreBtn)({
})

const CancelPickCouponIcon = styled(HighlightOffIcon)({
    width: '0.8em',
    height: '0.8em',
    color: 'white',
})