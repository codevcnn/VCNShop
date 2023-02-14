import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ProblemBoard from "../../problem_board"
import OTPInput from "./OTP_input"
import BottomForm from "../bottom_form"
import "react-toastify/dist/ReactToastify.css"
import CircularProgress from '@mui/material/CircularProgress'
import ResendOTP from "./resend_OTP"
import { NavLink } from "react-router-dom"
import { toast } from 'react-toastify'

const SignUpBoard = () => {
    const [phoneInputValue, setPhoneInputValue] = useState('')
    const [openProblemBoard, setOpenProblemBoard] = useState(false)
    const [OTPWasSent, setOTPWasSent] = useState(false)
    const [sendOTPInProgress, setSendOTPInProgress] = useState(false)
    const [timeToResendOTP, setTimeToResendOTP] = useState(120)

    const handleOpenProblemBoard = open => {
        setOpenProblemBoard(open)
    }

    const sendOTP = (e) => {
        try {
            e.preventDefault()
            setSendOTPInProgress(true)
            setTimeout(() => {
                setSendOTPInProgress(false)
                setOTPWasSent(true)
                toast.success('OTP was sent!')
            }, 1000)
        } catch (err) {
            toast.error('Fail to send OTP!')
        }
    }

    return (
        <>
            <ProblemBoard open={openProblemBoard}
                handleOpen={handleOpenProblemBoard}
            />

            <SignUpBoardArea id="SignUpBoardArea">
                <FormContainer action="#" method="post"
                    onSubmit={sendOTP}
                >
                    <FormTitle >Register</FormTitle>
                    {OTPWasSent ?
                        <OTPInput />
                        :
                        <>
                            <FormGroup>
                                <Label htmlFor="StyledPhoneInput">
                                    Enter your phone number here...
                                </Label>
                                <StyledPhoneInput
                                    type="text"
                                    value={phoneInputValue}
                                    international
                                    placeholder="Enter your phone number..." 
                                    id="StyledPhoneInput" 
                                    defaultCountry="VN"
                                    onChange={setPhoneInputValue}
                                    initialValueFormat="national"
                                />
                            </FormGroup>
                            <Saying>
                                An OTP code will be sent to your phone number to
                                verify.
                            </Saying>
                        </>
                    }
                    <SendOTPArea>
                        <Problems
                            onClick={() => handleOpenProblemBoard(true)}
                        >
                            Have problem ?
                        </Problems>
                        {sendOTPInProgress ?
                            <SendOTPBtn>
                                <CircularProgress sx={{ color: 'black', }}
                                    size={18} thickness={6}
                                />
                            </SendOTPBtn>
                            :
                            OTPWasSent ?
                                <ResendOTP secondsStarter={timeToResendOTP} />
                                :
                                <SendOTPBtn>
                                    Send OTP
                                </SendOTPBtn>
                        }
                    </SendOTPArea>
                </FormContainer>

                <SignIn >
                    <span>Already have an account ? </span>
                    <NavLink to="/auth/login" className="NavLink">
                        Sign In.
                    </NavLink>
                </SignIn>

                <BottomForm />

            </SignUpBoardArea>
        </>
    )
}

export default SignUpBoard

const SignUpBoardArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '45%',
    height: '100%',
    position: 'absolute',
    zIndex: '2',
    right: '0',
    padding: '20px 40px 30px',
    boxSizing: 'border-box',
    backgroundColor: '#1c1c1c',
})

const FormContainer = styled('form')({

})

const FormTitle = styled('h2')({
    fontFamily: '"Roboto", "sans-serif"',
    fontWeight: '500',
    fontSize: '2em',
    color: 'white',
    margin: '10px 0 15px',
})

const FormGroup = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderBottom: '1.2px #33b8b6 solid',
    padding: '30px 15px 5px',
})

const Label = styled('label')({
    color: 'white',
    fontFamily: '"Roboto", "sans-serif"',
    fontWeight: '500',
    padding: '2px',
    position: 'absolute',
    top: '0',
    left: '0',
})

const StyledPhoneInput = styled(PhoneInput)({
    boxSizing: 'border-box',
    paddingLeft: '10px',
    width: '88%',
    borderLeft: '1.2px #33b8b6 solid',
    '& .PhoneInputCountry': {
        marginRight: '10px',
        paddingRight: '10px',
        borderRight: '1.2px #33b8b6 solid',
        '& .PhoneInputCountryIcon , .PhoneInputCountrySelectArrow': {
            color: 'white',
        },
        '& .PhoneInputCountrySelectArrow': {
            borderBottomWidth: '2px',
            borderRightWidth: '2px',
        },
    },
    '& input': {
        backgroundColor: 'transparent',
        color: 'white',
        border: 'unset',
        outline: 'unset',
        boxSizing: 'border-box',
        padding: '5px',
        fontSize: '1.1em',
    }
})

const Saying = styled('p')({
    margin: '5px 0 10px',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
    color: 'white',
    fontSize: '0.8em',
})

const SendOTPArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5px',
})

const Problems = styled('div')({
    fontFamily: '"Roboto", "sans-serif"',
    color: '#d32f2f',
    fontSize: '0.9em',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const SendOTPBtn = styled('button')({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#00b0a7',
    padding: '7px 10px',
    borderRadius: '5px',
    border: '1px black solid',
})

const SignIn = styled('div')({
    color: 'white',
    fontFamily: '"Nunito", "sans-serif"',
    '& .NavLink': {
        color: 'yellow',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'unset',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
})