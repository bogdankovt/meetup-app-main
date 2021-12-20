import { Alert, Button, Snackbar } from '@mui/material'
import PageHeader from '../../../components/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AddField, AddMeetupDraft } from './Actions'
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MeetupsCreatePage() {
    const [open, setopen] = useState(false)
    const dispatch = useDispatch()
    let draft = useSelector((state: any) => state.admin.draftMeetup);
    let navigate = useNavigate();
    let Duration: any;
    Duration = 60;
    const marks = [
        {
            value: 60,
            label: '1 година',
        },
        {
            value: 90,
            label: '1 година 30 хвилин',
        },
        {
            value: 120,
            label: '2 години',
        },
        {
            value: 150,
            label: '2 години 30 хвилин',
        },
        {
            value: 180,
            label: '3 години',
        }
    ]
    const validationSchema = yup.object({
        title: yup
            .string()
            .required('Введіть назву мітапа'),
        slug: yup
            .string()
    });
    function converter(time: any) {
        switch (time) {
            case 60:
                return "01:00:00";
            case 90:
                return "01:30:00";
            case 120:
                return "02:00:00";
            case 150:
                return "02:30:00";
            case 180:
                return "02:30:00";
            default:
                break;
        }
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            slug: ''
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            AddMeetupDraft(draft)(dispatch)
                .then(res => {
                    if (res.payload.status === 400) {
                        formik.errors.slug = "Даний слаг вже використовується";
                        formik.getFieldHelpers('slug').setError(formik.errors.slug);
                    }
                    else {
                        if (draft.status === 'Draft') {
                            setopen(true)
                        }
                        else if (draft.status === 'Published') {
                            setopen(true)
                        }
                    }
                }).then(_=> {if (Boolean(formik.errors.slug) == false) {formik.resetForm()}; resetHTMLForm()} )
},
    });
function resetHTMLForm(){
    let form = (document.getElementById('form')!) as HTMLFormElement
    form.reset()
}

function string_to_slug(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    return str;
}

return (
    <div >
        <PageHeader>Створення нового мітапу</PageHeader>
        <form id='form'
            onSubmit={formik.handleSubmit}>
            <TextField sx={{ marginTop: 2 }}
                onChange={(value: any) => {
                    formik.handleChange(value);
                    let slug = string_to_slug(value.target.value)
                    dispatch(AddField(value.target.id, value.target.value));
                    formik.getFieldHelpers('slug').setValue(slug)
                    dispatch(AddField("slug", slug))
                }}
                fullWidth
                variant='standard'
                id="title" name="title" label="Назва мітапу" type="title"
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <TextField sx={{ marginTop: 2 }}
                fullWidth
                variant='standard'
                id="slug" label="Slug" type="slug" value={(formik.values.slug)}
                error={formik.touched.slug && Boolean(formik.errors.slug)}
                helperText={formik.touched.slug && formik.errors.slug}
                onChange={(value: any) => {
                    dispatch(AddField(value.target.id, value.target.value));
                    formik.handleChange(value);
                }}
                InputLabelProps={{ shrink: true, }}
            />
            <TextField sx={{ marginTop: 2 }}
                variant='standard'
                id="beginningAt" label="Початок мітапу" type="datetime-local"
                onChange={(value: any) => {
                    dispatch(AddField(value.target.id, value.target.value));
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField sx={{ marginTop: 2, ml: 5 }}
                variant='standard'
                id="registrationDeadline" label="Кінець реєстрації на мітап" type="datetime-local"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(value: any) => {
                    dispatch(AddField(value.target.id, value.target.value));
                }}
            />
            <TextField sx={{ marginTop: 2 }}
                fullWidth
                variant='standard'
                multiline
                minRows={3}
                onChange={(value: any) => {
                    dispatch(AddField(value.target.id, value.target.value));
                }}
                id="shortDescription" label="Короткий опис"
            />
            <TextField sx={{ marginTop: 2 }}
                fullWidth
                multiline
                variant='standard'
                minRows={3}
                onChange={(value: any) => {
                    dispatch(AddField(value.target.id, value.target.value));
                }}
                id="longDescription" label="Повний опис"
            />
            <TextField sx={{ marginTop: 2 }}
                fullWidth
                variant='standard'
                id="location" label="Адреса"
                onChange={(value: any) => {
                    dispatch(AddField(value.target.id, value.target.value));
                }}
            />
            <TextField sx={{ marginTop: 2 }}
                fullWidth
                variant='standard'
                id="imageId" label="Ід картинки"
                onChange={(value: any) => {
                    dispatch(AddField(value.target.id, value.target.value));
                }}
            />
            <Slider
                id="duration"
                name="Duration"
                sx={{ ml: 4, my: 5, width: '95%' }}
                min={60}
                max={180}
                step={30}
                marks={marks}
                onChange={(value: any) => {
                    dispatch(AddField("duration", value.target.value));
                }}
            />
            <Button
                onClick={_ => {
                    dispatch(AddField("status", "Draft"));
                    dispatch(AddField("duration", converter(draft.duration)))
                }}
                variant="contained" type="submit" sx={{ mt: 1, pl: 1, bgcolor: 'primary.main' }}>
                <AddIcon />  Зберегти
            </Button>
            <Button
                onClick={_ => {
                    dispatch(AddField("status", "Published"));
                    dispatch(AddField("duration", converter(draft.duration)))
                }}
                variant="contained" type="submit" sx={{ mt: 1, ml: 2, pl: 1, bgcolor: 'success.main' }}>
                <NotificationsIcon /> Опублікувати
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={_ => setopen(false)}>
                <Alert onClose={_ => setopen(false)} severity="success" icon={false} >
                    {(draft.status === "Draft") ? ("Чернетку успішно збережено!") : ("Мітап опубліковано!")}
                </Alert>
            </Snackbar>
        </form>
    </div >
)
}