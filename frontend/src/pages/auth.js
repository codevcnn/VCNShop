import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import background_auth from '../assets/images/background_auth/background_auth.jpg'
import background_page from '../assets/images/background_auth/background_page.jpg'
import Paper from '@mui/material/Paper'
import SignUpBoard from "../components/auth/sign_up/sign_up"
import TermsOfUse from "../components/terms_of_use"
import LoginBoard from "../components/auth/login"
import ProvideInfoBoard from "../components/auth/provide_info/provide_info"
import ForgotPasswordBoard from "../components/auth/forgot_password"
import NewPassword from "../components/auth/new_password"
import { Route, Routes } from "react-router-dom"
import { NavLink } from "react-router-dom"

const Auth = () => {
    const [termsOfUseDialog, setTermsOfUseDialog] = useState(false)

    const handleOpenTermsOfUseDialog = (open) => {
        setTermsOfUseDialog(open)
    }

    return (
        <AuthArea id="AuthArea">

            <TermsOfUse openDialog={termsOfUseDialog}
                handleOpenDialog={handleOpenTermsOfUseDialog}
            />

            <AuthBoard elevation={5}>
                <TextAndImage id="TextAndImage">
                    <Desc>
                        Create lifestyle in your way.<br />
                        Shopping and enjoy the moment.<br />
                        Simply and smoothly.
                    </Desc>
                    <Visit to="/">
                        VISIT VCN SHOP
                    </Visit>
                    <BottomText>
                        <Text to="/">
                            Home
                        </Text>
                        <Text
                            onClick={() => handleOpenTermsOfUseDialog(true)}
                        >
                            Terms Of Use
                        </Text>
                        <Text>About Us</Text>
                    </BottomText>
                </TextAndImage>

                <Routes>
                    <Route>
                        <Route path="/login" element={<LoginBoard />} />
                        <Route path="/forgotPassword" element={<ForgotPasswordBoard />} />
                        <Route path="/register" element={<SignUpBoard />} />
                        <Route path="/newPassword" element={<NewPassword />} />
                        <Route path="/provideInfo" element={<ProvideInfoBoard />} />
                    </Route>
                </Routes>
            </AuthBoard>
        </AuthArea>
    )
}

export default Auth

const AuthArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${background_page})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        backgroundColor: '#0000008c',
    }
})

const AuthBoard = styled(Paper)({
    display: 'flex',
    width: '85vw',
    height: '80vh',
    backgroundColor: 'white',
    position: 'relative',
    backgroundImage: `url(${background_auth})`,
    backgroundSize: '60% 102%',
    overflowY: 'hidden',
})

const TextAndImage = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    zIndex: '1',
    width: '62%',
    padding: '0 50px',
    boxSizing: 'border-box',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        backgroundColor: '#00000073',
    }
})

const Desc = styled('div')({
    position: 'relative',
    zIndex: '10',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'white',
    fontSize: '1.8em',
    fontWeight: 'bold',
    textShadow: '2px 2px black',
})

const Visit = styled(NavLink)({
    position: 'relative',
    color: 'black',
    zIndex: '10',
    padding: '8px 28px',
    backgroundColor: 'white',
    borderRadius: '3px',
    width: 'fit-content',
    marginTop: '20px',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    cursor: 'pointer',
    boxShadow: '3px 3px black',
    textDecoration: 'unset',
    '&:active': {
        top: '3px',
        left: '3px',
        boxShadow: 'unset',
    }
})

const BottomText = styled('div')({
    display: 'flex',
    position: 'absolute',
    bottom: '30px',
    left: '5%',
})

const Text = styled(NavLink)({
    marginLeft: '45px',
    width: 'max-content',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    fontStyle: 'italic',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'unset',
    '&:hover': {
        textDecoration: 'underline',
    }
})