import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { styled } from '@mui/material/styles'
import InformationInputs from "./Information_inputs"
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
import "react-toastify/dist/ReactToastify.css"
import { toast } from 'react-toastify'

const favourite_fashion = ['Unisex', 'Suit', 'Sneaker', 'Sport', 'Design']

const ProvideInfoBoard = () => {
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [showWarningCheckbox, setShowWarning] = useState(false)
    const [shakeWarningCheckbox, setShakeWarning] = useState(false)
    const [submitChecking, setSubmitChecking] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const handleChangeCheckbox = (e) => {
        setCheckboxChecked(!checkboxChecked)
        if (e.target.checked) {
            setShowWarning(false)
        }
    }

    const checkProvideInfo = (data, e) => {
        if (!checkboxChecked) setShowWarning(true)
        setShakeWarning(true)
        if (!checkboxChecked) return
        setSubmitChecking(true)
        try {
            toast.success('Updated your profile!')
            e.target.submit()
        } catch (err) {
            toast.error('Something went wrong!')
        }
    }

    return (
        <ProvideInfoForm id="ProvideInfoBoard" action="#" method="post"
            onSubmit={handleSubmit(checkProvideInfo)}
        >
            <Title>We need more information...</Title>
            <Desc>
                The information below may serve to improve user experience
                in the future, we assure you that the information you
                provide is completely confidential and will be protected
                in accordance with our privacy policy. Thank you!
            </Desc>

            <Divider sx={{ backgroundColor: '#999999', marginTop: '10px' }} />

            <InformationInputs register={register} reset={reset} errors={errors} />

            <ChooseFavouriteContainer>
                <ChooseFashionLabel>
                    Tell us what's your favourtite...
                </ChooseFashionLabel>
                <ChooseFashionHelperText>
                    We will often recommend them to you.
                </ChooseFashionHelperText>
                <RadioGroup
                    aria-labelledby="ChooseFashion-radio-buttons-group-label"
                    defaultValue="Unisex"
                >
                    {
                        favourite_fashion.map((items) => (
                            <StyledFormControlLabel value={items} label={items} key={items}
                                control={
                                    <Checkbox color="default" sx={{ color: '#00fffb', }}
                                        size="small" name={items}
                                    />
                                }
                            />
                        ))
                    }
                </RadioGroup>
            </ChooseFavouriteContainer>

            <Divider sx={{ backgroundColor: '#999999', marginTop: '10px', }} />

            <TermOfUseContainer>
                <Checkbox color="default" size="small"
                    sx={{
                        color: 'red',
                        width: '1em',
                        height: '1em',
                    }}
                    id="TermOfUseCheckbox"
                    onChange={handleChangeCheckbox}
                />
                <CheckboxLabel htmlFor="TermOfUseCheckbox">
                    Accept our terms of use.
                </CheckboxLabel>
                <span className="star_char">*</span>
            </TermOfUseContainer>
            {
                showWarningCheckbox &&
                <CheckboxWarning className={shakeWarningCheckbox ? 'shake_warning' : ''}
                    onAnimationEnd={() => setShakeWarning(false)}
                >
                    You must acccept our terms of use. Please!
                </CheckboxWarning>
            }

            <SubmitBtnContainer>
                {
                    submitChecking ?
                        <CircularProgress sx={{ color: '#00fffb', }}
                            size={18} thickness={6}
                        />
                        : <span>Start Shopping</span>
                }
            </SubmitBtnContainer>
        </ProvideInfoForm>
    )
}

export default ProvideInfoBoard

const ProvideInfoForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '45%',
    height: '100%',
    position: 'absolute',
    zIndex: '2',
    right: '0',
    padding: '30px 40px 20px',
    boxSizing: 'border-box',
    backgroundColor: '#1c1c1c',
    overflowY: 'auto',
})

const Title = styled('h2')({
    color: 'white',
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.5em',
    fontWeight: 'bold',
    paddingBottom: '8px',
    width: 'fit-content',
    position: 'relative',
    '&::after': {
        content: '""',
        height: '5px',
        width: '100%',
        backgroundColor: '#893bff',
        position: 'absolute',
        bottom: '0',
        left: '15px',
    }
})

const Desc = styled('p')({
    margin: '0',
    marginTop: '10px',
    fontFamily: 'nunito',
    fontSize: '0.9em',
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
})

const ChooseFavouriteContainer = styled('div')({
    marginTop: '20px',
    '& label.MuiFormControlLabel-root': {
        width: 'fit-content',
    }
})

const ChooseFashionLabel = styled('label')({
    display: 'block',
    width: 'fit-content',
    color: 'white',
    margin: '0px 5px 3px',
    fontWeight: 'bold',
    fontFamily: 'arial',
    fontSize: '1.05em',
})

const StyledFormControlLabel = styled(FormControlLabel)({
    marginLeft: '0px',
    '& span.MuiTypography-root': {
        color: 'white',
        fontFamily: 'arial',
        fontSize: '0.9em',
    }
})

const ChooseFashionHelperText = styled('div')({
    color: 'white',
    fontSize: '0.8em',
    fontStyle: 'italic',
    fontFamily: 'nunito',
    marginTop: '5px',
    marginLeft: '5px',
})

const TermOfUseContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    '& span.star_char': {
        display: 'inline-block',
        color: 'red',
        fontFamily: 'nunito',
        fontSize: '1.5em',
        height: '22px',
        marginLeft: '5px',
    }
})

const CheckboxLabel = styled('label')({
    marginLeft: '5px',
    marginTop: '1px',
    fontSize: '0.9em',
    fontFamily: 'nunito',
    color: 'white',
})

const CheckboxWarning = styled('span')({
    display: 'block',
    fontFamily: 'nunito',
    fontSize: '0.9em',
    color: 'red',
    marginTop: '5px',
    '&.shake_warning': {
        animation: 'shake_warning 0.5s 1',
    },
    '@keyframes shake_warning': {
        '0%': { 'transform': 'translate(1px, 1px) rotate(0deg)' },
        '10%': { 'transform': 'translate(-1px, -2px) rotate(1deg)' },
        '20%': { 'transform': 'translate(-3px, 0px) rotate(-1deg)' },
        '30%': { 'transform': 'translate(3px, 2px) rotate(0deg)' },
        '40%': { 'transform': 'translate(1px, -1px) rotate(-1deg)' },
        '50%': { 'transform': 'translate(-1px, 2px) rotate(1deg)' },
        '60%': { 'transform': 'translate(-3px, 1px) rotate(0deg) ' },
        '70%': { 'transform': 'translate(3px, 1px) rotate(1deg)' },
        '80%': { 'transform': 'translate(-1px, -1px) rotate(-1deg)' },
        '90%': { 'transform': 'translate(1px, 2px) rotate(0deg)' },
        '100%': { 'transform': 'translate(1px, -2px) rotate(1deg)' },
    }
})

const SubmitBtnContainer = styled('button')({
    display: 'block',
    backgroundColor: 'transparent',
    border: 'unset',
    width: 'fit-content',
    fontFamily: '"Bungee Spice", "cursive"',
    fontSize: '1.3em',
    fontWeight: 'bold',
    cursor: 'pointer',
    wordSpacing: '4px',
    margin: '0 auto',
    marginTop: '30px',
    padding: '3px',
    position: 'relative',
    '&:hover': {
        '&::before': {
            left: '-0.7em',
        },
        '&::after': {
            right: '-0.7em',
        },
    },
    '&::before': {
        content: '">"',
        fontFamily: '"Bungee Spice", "cursive"',
        fontSize: '1.2em',
        position: 'absolute',
        left: '-0.9em',
        top: '0',
        paddingRight: '50%',
        transition: 'left 0.2s'
    },
    '&::after': {
        content: '"<"',
        fontFamily: '"Bungee Spice", "cursive"',
        fontSize: '1.2em',
        position: 'absolute',
        top: '0',
        right: '-0.9em',
        paddingLeft: '50%',
        transition: 'right 0.2s'
    },
})