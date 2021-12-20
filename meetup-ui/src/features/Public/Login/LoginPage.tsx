import React from 'react'
import { Button, Container, Grid, IconButton, InputAdornment, TextField, } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginErrorSelector, userSelector } from './LoginSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthorizationForm from '../../../components/AuthorizationForm';

export default function LoginPage() {
    
    const headerStyle = {
        fontFamily: 'Ubuntu Condensed',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '48px',
        lineHeight: '56px',
        display: 'flex',
        alignItems: 'flex-end',
        textAlign: 'center' as 'center',
        marginTop: '32px'
    };
    return (
        <Grid container justifyContent="center">
            <Grid item xs={10} sm={6} md={4} lg={4}>
            <h1
                style={headerStyle}>
                InterLink Meetup
            </h1>
            <AuthorizationForm redirectTo="/registration" backURL='/'></AuthorizationForm>
        </Grid>
        </Grid>
    )
}
