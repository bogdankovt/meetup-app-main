import { Grid, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { closeAlert, currentMeetupsSelector, registrationOnMeetup } from './MeetupDetailsSlice'
import { getMeetupDetails } from './Actions'
import MeetupRegistration from '../../../components/MeetupRegistration'
import moment from 'moment'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { userAuth } from '../Login/LoginSlice'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MeetupDetailsPage() {
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const meetup = useAppSelector(currentMeetupsSelector);
    const userAuthorization = useAppSelector(userAuth);


    useEffect(() => {
        dispatch(getMeetupDetails(slug));
    }, [slug, meetup.details.registration_status])

    const closeAlertMessage = () => {
        dispatch(closeAlert(false))
    }

    const registerUserOnMeetup = (source: string) => {
        dispatch(registrationOnMeetup({ meetupSlug: slug, meetupSource: source }));
    }

    return (
        <Box >
            <Grid container sx={{ flexDirection: "column" }}>
                <Grid item>
                    <Typography variant="h3" sx={{ textAlign: "center", pt: { xs: "4px", md: "46px" }, fontSize: { xs: "28px", md: "48px" } }}>{meetup.details.title}</Typography>
                    <Typography variant="h5" sx={{ textAlign: "center", color: 'primary.main', pt: "14px", pb: "14px" }}>{moment(meetup.details.beginning_at).format('D.MM.Y HH:mm')}</Typography>
                </Grid>
                <Box >
                    <Grid item>
                        <Box component="img" src={process.env.PUBLIC_URL + `/covers/image_${meetup.details.image_id}.jpg`} sx={{ width: "100%" }}></Box>
                    </Grid>
                </Box>
                <Grid item>
                    <Typography variant="body1" sx={{ textAlign: "justify", pt: "16px", fontSize: { xs: "16px", md: "20px" } }}>{meetup.details.long_description}</Typography>
                </Grid>
                <Grid item>
                    {meetup.details.status === "Completed"
                        ?
                        <Grid></Grid>
                        :
                        <Grid>
                            <Typography variant="h6" sx={{ pb: '22px', fontSize: { xs: "16px", md: "20px" } }}>
                                Реєстрація триватиме до <Box component='span' sx={{ color: 'primary.main' }}>
                                    {moment(meetup.details.registration_deadline).format('D.MM.Y HH:mm')}
                                </Box>
                            </Typography>
                        </Grid>
                    }
                </Grid>
                <Grid item>
                    <MeetupRegistration authorized={userAuthorization}
                        userStatus={meetup.details.registration_status}
                        meetupStatus={meetup.details.status}
                        loading={meetup.loading}
                        meetupDate={meetup.details.beginning_at}
                        onSubmit={registerUserOnMeetup} />
                </Grid>
            </Grid>
            <Snackbar open={meetup.alert.open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={4000} onClose={closeAlertMessage}>
                <Alert onClose={closeAlertMessage} severity={meetup.alert.variant} sx={{ width: '100%' }}>
                    {meetup.alert.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
