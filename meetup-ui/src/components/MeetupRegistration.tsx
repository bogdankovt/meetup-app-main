import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, CircularProgress, createTheme, FormHelperText, Grid, IconButton, Slide, TextField, Toolbar, Typography, useMediaQuery } from '@mui/material';
import RegistrationForm from '../features/Public/Registration/RegistrationForm';
import AuthorizationForm from './AuthorizationForm';
import { TransitionProps } from '@mui/material/transitions';
import { useEffect, useState } from 'react';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const alreadyRegistratedButton = <Button variant="contained" startIcon={<CheckCircleIcon />} disabled={true}>Ви вже зареєстровані</Button>;

export default function MeetupRegistration(props: any) {
    const userStatus = useState(props.userStatus);
    const [open, setOpen] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState('');
    const [source, setSource] = useState('0');
    const [showAuthorization, setAuthorization] = useState(true);
    const [inputError, setInputError] = useState(false);
    const [helperText, setHelperText] = useState('Виберіть відповідь');

    const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      });
      
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSource((event.target as HTMLInputElement).value);
        setHelperText('');
        setInputError(false);
    };

    const resetForm = () => {
        setSource('0');
        setInputError(false);
        setAuthorization(true);
        setHelperText('Виберіть відповідь');
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const closeModalWindow = () => {
        setOpen(false);
    }

    const openRegistration = (value: boolean) => {
        setAuthorization(value);
    }

    const checkUserRegistration = (status: any) => {
        let answer = (status === 'Registered' || status === 'Invited' || status === 'Visited')
        return answer;
    }

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        event.preventDefault()
        if (reason !== 'backdropClick') {
            if((event.target as HTMLInputElement).name === "append") {
                if(source.length <= 2) {
                    setHelperText("Відповідь обов'язкова")
                    setInputError(true);
                } else {
                    props.onSubmit(source)
                    setOpen(false);
                    resetForm();
                }
            }
            else {
                setOpen(false);
                resetForm();
            }
        }
    };

    return (
        <div>
            {props.meetupStatus !== 'Completed' ? 
                ((props.userStatus === 'Registered' || props.userStatus === 'Invited') ? 
                    alreadyRegistratedButton
                    :
                    <LoadingButton variant="contained"
                    sx={{minWidth: {xs:'100%', md:"328px"}}}
                    children={'Хочу на мітап'}
                    loading={props.loading}
                    disabled={props.loading}
                    onClick={handleClickOpen} />  
                ) 
            : 
            (checkUserRegistration(props.userStatus) ? alreadyRegistratedButton : <div />)}
        <Grid container justifyContent="center">
            <Grid xs={12} sm={6} md={6} lg={4}>
        <Dialog disableEscapeKeyDown
            fullScreen={fullScreen}
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant={ props.authorized ? 'subtitle1' : 'h6'} component="div">
                            { props.authorized ? (checkUserRegistration(props.userStatus) ? '' : 'Звідки Ви дізналися про мітап?') : (showAuthorization ? 'Увійти' : 'Реєстрація')}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    { props.authorized ? 
                        (props.userStatus ? 
                            (checkUserRegistration(props.userStatus) ? 
                                <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="body1" component="div">
                                        Ми дізнались що Ви вже зареєстровані, чекаємо на вас {moment(props.meetupDate).format('D.MM.Y')} о {moment(props.meetupDate).format('HH:mm')} ;)
                                    </Typography>
                                    {/* <DialogActions>
                                        <Button name="append" variant="outlined" children="Чудово" onClick={closeModalWindow} />
                                    </DialogActions> */}
                                </DialogContent> 
                            : 
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                            <RadioGroup
                                                defaultValue={source}
                                                name="radio-buttons-group"
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="Зі сторінки InterLink на Facebook" control={<Radio />} label="Зі сторінки InterLink на Facebook" />
                                                <FormControlLabel value="Зі сторінки Cherkasy IT Cluster на Facebook" control={<Radio />} label="Зі сторінки Cherkasy IT Cluster на Facebook" />
                                                <FormControlLabel value="З Telegram" control={<Radio />} label="З Telegram" />
                                                <FormControlLabel value="Від колеги" control={<Radio />} label="Від колеги" />
                                                <FormControlLabel value="Від друга" control={<Radio />} label="Від друга" />
                                                <FormControlLabel value="Від викладача" control={<Radio />} label="Від викладача" />
                                                <FormControlLabel value="Розсилка на Email" control={<Radio />} label="Розсилка на Email" />
                                                <FormControlLabel value="Slack комьюніті 'Черкаські ІТшники'" control={<Radio />} label='Slack комьюніті "Черкаські ІТшники"' />
                                                <FormControlLabel value="DOU" control={<Radio />} label="DOU" />
                                                <FormControlLabel value="Instagram" control={<Radio />} label="Instagram" />
                                                <FormControlLabel value={textFieldValue} control={<Radio checked={source === textFieldValue}/>} label='Інше'/>
                                                {source === textFieldValue ? 
                                                    <TextField fullWidth 
                                                        defaultValue={textFieldValue}
                                                        label='Ваша відповідь'
                                                        onChange={(event: any) => {
                                                            setTextFieldValue(event.target.value); 
                                                            setSource(event.target.value)}} 
                                                        variant="standard"/> 
                                                    : <div/>}
                                            </RadioGroup>
                                            <FormHelperText error={inputError}>{helperText}</FormHelperText>
                                        </FormControl>
                                    </Box>
                                    <DialogActions>
                                        <Button name="append" variant="contained" children="Підтвердити" onClick={handleClose} />
                                    </DialogActions>
                                </DialogContent>)
                            :
                            <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Typography  variant="body1" component="div">
                                    Зачекайте будь ласка, перевірка даних
                                </Typography>
                                <CircularProgress size={80}/>
                            </DialogContent>)
                        
                    : 
                        <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {showAuthorization ? 
                            <AuthorizationForm onRegistration={openRegistration}/>  
                            : 
                            <RegistrationForm />}
                        </DialogContent>
                    }
            </Dialog>
            </Grid>
                </Grid>
        </div>
    );
}
