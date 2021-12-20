import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getMeetups } from './Actions'
import { meetupFeedSelector } from './MeetupHomeControlSlice'
import MeetupCard from './MeetupCard'
import { Box, useMediaQuery, Container, Typography, Grid } from "@mui/material"

export default function MeetupHomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeetups())
    }, [])

    const meetupControl = useSelector(meetupFeedSelector)
    const completedMeetups = meetupControl.meetups.filter((m: any) => m.status === "Completed")
    const publishedMeetups = meetupControl.meetups.filter((m: any) => m.status === "Published")

    return (
        <Box>
            <Typography variant="h2" sx={{ pt: "28px", fontSize: { xs: "32px", md: "48px" } }}>Заплановані мітапи</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {publishedMeetups.map((m: any, id: Number) => <MeetupCard key={id} meetup={m} />)}
                </Grid>
            </Box>

            <Typography variant="h2" sx={{ pt: "28px", fontSize: { xs: "32px", md: "48px" } }}>Минулі мітапи</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {completedMeetups.map((m: any, id: Number) => <MeetupCard key={id} meetup={m} />)}
                </Grid>
            </Box>
        </Box >
    )
}