import React, { useState } from 'react'
import { signUp } from './Actions'
import { useDispatch } from 'react-redux';
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack} from '@mui/material';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { login } from '../Login/LoginSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function RegistrationForm(props: any) {
    const [showInstitutionSelect, setShowInstitutionSelect] = useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleSecondPassword, setIsVisibleSecondPassword] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const visitEducationInstitution = 'Відвідую ВНЗ';
    const institutionDefault = 'none';
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
    const activities = [visitEducationInstitution, 'Працюю в IT', 'Хочу в IT'];
    const institutions = ['ЧНУ', 'ЧДТУ', 'ЧДБК', 'Інший ВУЗ', 'Вже закінчив'];

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            second_password: '',
            first_name: '',
            last_name: '',
            birthday: '',
            phone: '',
            activity: '',
            institution: institutionDefault
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Неправильний адрес електронної пошти')
                .required("Обов'язкове поле"),
            password: Yup.string()
                .required("Обов'язкове поле"),
            second_password: Yup.string()
                .required("Обов'язкове поле")
                .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати'),
            first_name: Yup.string()
                .required("Обов'язкове поле"),
            last_name: Yup.string()
                .required("Обов'язкове поле"),
            birthday: Yup.date()
                .required("Обов'язкове поле"),
            phone: Yup.string()
                .required("Обов'язкове поле")
                .matches(phoneRegExp, 'Неправильний формат номера телефону'),
            activity: Yup.string()
                .required("Обов'язкове поле"),
            institution: Yup.string()
                .required("Обов'язкове поле"),
        }),
        onSubmit: values => {
            const data = {
                email: values.email,
                password: values.password,
                first_name: values.first_name,
                last_name: values.last_name,
                birthday: values.birthday,
                phone: values.phone,
                activity: values.activity,
                institution: values.institution
            };

            signUp(data)(dispatch)
                .then(res => {
                    if (res.payload.status === 201) {
                        try {
                            dispatch(login(res.payload.data));
                            if (props.redirectTo !== null && props.redirectTo !== '' && props.redirectTo !== undefined) {
                                navigate(props.redirectTo);
                            }
                            try {
                                props.onSubmit(true)
                            }
                            catch { }
                        }
                        catch {
                            console.log('Authorization error');
                        }
                    }
                    else if (res.payload.status === 400) {
                        formik.errors.email = res.payload.data;
                        formik.getFieldHelpers('email').setError(formik.errors.email);
                    }
                    else if (res.payload.status === 500) {
                        console.log(res.payload.data);
                    }
                })
        },
    });

    return (
        <form id="registration-form" onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>

                <Box>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Електронна пошта"
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.email}</FormHelperText>
                        : null}
                </Box>

                <Box >
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type={isVisiblePassword ? "text" : "password"}
                        label="Пароль"
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setIsVisiblePassword(!isVisiblePassword)}>
                                        {isVisiblePassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {formik.touched.password && formik.errors.password
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.password}</FormHelperText>
                        : null}
                </Box>

                <Box >
                    <TextField
                        fullWidth
                        id="second_password"
                        name="second_password"
                        type={isVisibleSecondPassword ? "text" : "password"}
                        label="Повторний пароль"
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.second_password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setIsVisibleSecondPassword(!isVisibleSecondPassword)}>
                                        {isVisibleSecondPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {formik.touched.second_password && formik.errors.second_password
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.second_password}</FormHelperText>
                        : null}
                </Box>

                <Box >
                    <TextField
                        fullWidth
                        id="first_name"
                        name="first_name"
                        type="text"
                        label="Ім'я"
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                    />
                    {formik.touched.first_name && formik.errors.first_name
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.first_name}</FormHelperText>
                        : null}
                </Box>

                <Box >
                    <TextField
                        fullWidth
                        id="last_name"
                        name="last_name"
                        type="text"
                        label="Прізвище"
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                    />
                    {formik.touched.last_name && formik.errors.last_name
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.last_name}</FormHelperText>
                        : null}
                </Box>

                <Box >
                    <InputLabel htmlFor="birthday">Дата народження</InputLabel>
                    <TextField
                        fullWidth
                        id="birthday"
                        name="birthday"
                        type="date"
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.birthday}
                    />
                    {formik.touched.birthday && formik.errors.birthday
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.birthday}</FormHelperText>
                        : null}
                </Box>

                <Box >
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        type="text"
                        label="Номер телефону"
                        variant="standard"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.phone}</FormHelperText>
                        : null}
                </Box>

                <FormControl variant="standard">
                    <InputLabel id="registration-form-activity-label">Виберіть діяльність</InputLabel>
                    <Select
                        labelId="registration-form-activity-label"
                        id="activity"
                        name="activity"
                        value={formik.values.activity}
                        onChange={formik.handleChange}
                    >
                        {activities.map(value =>
                            <MenuItem
                                key={value}
                                value={value}
                                onClick={
                                    () => value === visitEducationInstitution ? setShowInstitutionSelect(true) : setShowInstitutionSelect(false)}
                            >
                                {value}
                            </MenuItem>
                        )}
                    </Select>
                    {formik.touched.activity && formik.errors.activity
                        ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.activity}</FormHelperText>
                        : null}
                </FormControl>

                {showInstitutionSelect ? <FormControl variant="standard">
                    <InputLabel id="registration-form-activity-label">Виберіть навчальний заклад</InputLabel>
                    <Select
                        labelId="registration-form-activity-label"
                        name="institution"
                        value={formik.values.institution}
                        onChange={formik.handleChange}
                    >
                        {institutions.map(value =>
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        )}
                    </Select>
                    {formik.touched.institution && formik.errors.institution
                        ? <FormHelperText sx={{ color: 'red'}}>{formik.errors.institution}</FormHelperText>
                        : null}
                </FormControl> : null}
                <Button id="registration-form-button" variant="contained" type="submit">
                    Зареєструватися
                </Button>
            </Stack>
        </form>
    );
}