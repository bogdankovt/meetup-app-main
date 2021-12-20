import React, { useEffect } from 'react'
import { Box, Button, Grid, IconButton, InputAdornment, TextField, } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { login, loginErrorSelector, setLoginError, userSelector } from '../features/Public/Login/LoginSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { backURLSelector, setBackURL } from '../redirectSlice';



const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .required('Введіть пароль.'),
    email: Yup.string()
        .email('Введіть коректну електронну адресу.')
        .required('Введіть електронну адресу.')
});
interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

export default function AuthorizationForm(props: any) {
    const dispatch = useAppDispatch();
    const backURL: string = useAppSelector(backURLSelector)
    useEffect(() => {
        if(!backURL)
        dispatch(setBackURL(props.backURL))
    }, [])
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    // const loginState = useSelector(userSelector)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            dispatch(login(values))
        }
    })
    const loginError = useSelector(loginErrorSelector)
    return (
            <form onSubmit={formik.handleSubmit}>

                <TextField
                    fullWidth
                    sx={{
                        mb: '8px'
                    }}
                    name='email'
                    label="Електронна пошта"
                    type="text"
                    variant="standard"
                    onChange={e => {
                        formik.handleChange(e);
                        if (loginError) {
                            dispatch(setLoginError(false))
                        }
                    }
                    }
                    error={(formik.touched.email && Boolean(formik.errors.email)) || loginError}
                    value={formik.values.email}
                >
                </TextField>

                <TextField
                    fullWidth
                    sx={{
                        mb: '8px'
                    }}
                    label="Пароль"
                    type={values.showPassword ? 'text' : 'password'}
                    variant="standard"
                    name='password'
                    onChange={e => {
                        formik.handleChange(e);
                        if (loginError) {
                            dispatch(setLoginError(false))
                        }
                    }
                    }

                    value={formik.values.password}
                    error={(formik.touched.password && Boolean(formik.errors.email)) || loginError}
                    helperText={(formik.touched.password && Boolean(formik.errors.email) || loginError) && 'Невірно введені пошта або пароль'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                >
                </TextField>

                <Button
                    variant='contained'
                    type='submit'
                    fullWidth
                    sx={{
                        mt: '32px',
                        mb: '8px'
                    }}
                >
                    Увійти
                </Button>
                <Button
                    variant='outlined'
                    fullWidth
                    sx={{
                        mb: '8px'
                    }}
                    onClick={async event => {
                        if (props.redirectTo) {
                            navigate(props.redirectTo);
                        }
                        else {
                            props.onRegistration(false);
                        }
                    }}
                >
                    Зареєструватись
                </Button>

            </form>
    )
}