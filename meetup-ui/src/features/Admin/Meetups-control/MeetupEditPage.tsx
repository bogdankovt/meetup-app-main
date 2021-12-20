import { Alert, Button, Snackbar } from '@mui/material'
import PageHeader from '../../../components/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AddField, GetMeetupDraft, UpdateMeetupDraft } from './Actions'
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

export default function MeetupsEditPage() {
    const [open, setopen] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const draft = useSelector((state: any) => state.admin.draftMeetup);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(GetMeetupDraft(id))
    }, [id])

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
            case "02:30:00":
                return 180;
            case "01:30:00":
                return 90;
            default:
                break;
        }
    }
    function reverse_converter(time: any) {
        switch (time) {
            case "01:00:00":
                return 60;
            case "01:30:00":
                return 90;
            case "02:00:00":
                return 120;
            case "02:30:00":
                return 150;
            case "02:30:00":
                return 180;
            default:
                break;
        }
    }
    const formik = useFormik({
        initialErrors: {},
        initialValues: {
            title: '',
            slug: ''
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            UpdateMeetupDraft(draft)(dispatch)
                .then(res => {
                    if (res.payload.status === 400) {
                        formik.errors.slug = "Даний слаг вже використовується";
                        formik.getFieldHelpers('slug').setError(formik.errors.slug);
                        dispatch(AddField("status", "Draft"))
                    }
                    else {
                        if (draft.status === 'Draft') {
                            setopen(true)
                        }
                        else if (draft.status === 'Published') {
                            setopen(true)
                        }
                        else if (draft.status === 'Completed') {
                            setopen(true)
                        }
                    }
                })
        },
    });
    function string_to_slug(str: string) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        return str;
    }
    formik.values.title = draft.title
    formik.values.slug = draft.slug
    return (
        (draft == undefined) ?
            <div />
            : <div >
                <PageHeader>Редагування мітапу</PageHeader>
                <form id={"form"}
                    onSubmit={e => { formik.handleSubmit(e) }}>
                    <TextField sx={{ marginTop: 2 }}
                        value={draft.title}
                        fullWidth
                        variant='standard'
                        id="title" name="title" label="Назва мітапу" type="title"
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        onChange={(value: any) => {
                            formik.handleChange(value);
                            let slug = string_to_slug(value.target.value)
                            dispatch(AddField(value.target.id, value.target.value));
                            formik.getFieldHelpers('slug').setValue(slug);
                            formik.setErrors({});
                            dispatch(AddField("slug", slug))
                        }}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField sx={{ marginTop: 2 }}
                        fullWidth
                        variant='standard'
                        id="slug" label="Slug" type="slug" value={(draft.slug)}
                        onChange={(value: any) => {
                            formik.handleChange(value);
                            formik.setSubmitting(false);
                            formik.errors.slug = '';
                            formik.getFieldHelpers('slug').setError(formik.errors.slug);
                            formik.setErrors({});
                            dispatch(AddField(value.target.id, value.target.value));
                        }}
                        error={formik.touched.slug && Boolean(formik.errors.slug)}
                        helperText={formik.touched.slug && formik.errors.slug}
                    />
                    <TextField sx={{ marginTop: 2 }}
                        value={moment(draft.beginningAt).format('YYYY-MM-DDTHH:mm')}
                        variant='standard'
                        id="beginningAt" label="Початок мітапу" type="datetime-local"
                        onChange={(value: any) => {
                            dispatch(AddField(value.target.id, moment(value.target.value).format('YYYY-MM-DDTHH:mm')));
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField sx={{ marginTop: 2, ml: 5 }}
                        value={moment(draft.registrationDeadline).format('YYYY-MM-DDTHH:mm')}
                        variant='standard'
                        id="registrationDeadline" label="Кінець реєстрації на мітап" type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(value: any) => {
                            dispatch(AddField(value.target.id, moment(value.target.value).format('YYYY-MM-DDTHH:mm')));
                        }}
                    />
                    <TextField sx={{ marginTop: 2 }}
                        value={draft.shortDescription}
                        fullWidth
                        variant='standard'
                        multiline
                        minRows={3}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(value: any) => {
                            dispatch(AddField(value.target.id, value.target.value));
                        }}
                        id="shortDescription" label="Короткий опис"
                    />
                    <TextField sx={{ marginTop: 2 }}
                        value={draft.longDescription}
                        fullWidth
                        multiline
                        variant='standard'
                        minRows={3}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(value: any) => {
                            dispatch(AddField(value.target.id, value.target.value));
                        }}
                        id="longDescription" label="Повний опис"
                    />
                    <TextField sx={{ marginTop: 2 }}
                        value={draft.location}
                        fullWidth
                        variant='standard'
                        id="location" label="Адреса"
                        onChange={(value: any) => {
                            dispatch(AddField(value.target.id, value.target.value));
                        }}
                    />
                    <TextField sx={{ marginTop: 2 }}
                        value={draft.imageId}
                        fullWidth
                        variant='standard'
                        id="imageId" label="Ід картинки"
                        onChange={(value: any) => {
                            dispatch(AddField(value.target.id, value.target.value));
                        }}
                    />
                    <Slider
                        defaultValue={reverse_converter(draft.duration)}
                        id="duration"
                        name="Duration"
                        sx={{ ml: 4, my: 5, width: '95%' }}
                        min={60}
                        max={180}
                        step={30}
                        marks={marks}
                        onChange={(value: any) => {
                            dispatch(AddField("duration", converter(value.target.value)));
                        }}
                    />
                    <Button onClick={_ => dispatch(AddField("status", "Draft"))}
                        id="working" variant="contained" type="submit" sx={{ mt: 1, pl: 1, bgcolor: 'primary.main' }}>
                        {(draft.status === "Draft") ?
                            (<><AddIcon /> Зберегти</>) : (<><AddIcon /> Перемістити в чернетки</>)}
                    </Button>
                    
                    {(draft.status === "Draft") ? (<Button onClick={_ => { dispatch(AddField("status", "Published")); }}
                        variant="contained" type="submit" sx={{ mt: 1, ml: 2, pl: 1, bgcolor: 'success.main' }}> <NotificationsIcon /> Опублікувати </Button>) :
                        (<Button onClick={_ => { dispatch(AddField("status", "Published")); }}
                        variant="contained" type="submit" sx={{ mt: 1, ml: 2, pl: 1, bgcolor: 'success.main' }}> <NotificationsIcon /> Опублікувати </Button>)}
                    {(draft.status === "Published") ?
                     (<Button onClick={_ => dispatch(AddField("status", "Completed"))}
                        variant="contained" type="submit" sx={{ ml: 70, pl: 1, bgcolor: 's.main' }}>
                        Завершити мітап </Button>) : ((draft.status === "Completed") ?  (<Button onClick={_ => dispatch(AddField("status", "Completed"))}
                        variant="contained" type="submit" sx={{  ml: 70, pl: 1, bgcolor: 's.main' }}>
                        Завершити мітап </Button>) : "")  }
                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={_ => setopen(false)}>
                        <Alert onClose={_ => setopen(false)} severity="success" icon={false} >
                            {(draft.status === "Draft") ? ("Чернетку успішно збережено!") : ((draft.status === "Published") ?("Мітап опубліковано!"): ("Мітап Завершено!"))}
                        </Alert>
                    </Snackbar>
                </form>
            </div>
    )
}