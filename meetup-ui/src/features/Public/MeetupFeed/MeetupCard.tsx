import * as React from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Box, Typography, Button, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

export default function MeetupCard({ meetup }: any) {
    return (
        <Grid item xs={4} sm={4} md={6}>
            <Card sx={{ mt: '16px' }}>
                <CardHeader
                    title={<Typography variant="h6">{meetup.title}</Typography>}
                    subheader={<Typography variant="body2">{moment(meetup.beginning_at).format('ddd, DD MMM, HH:mm')}</Typography>}
                />
                <CardMedia
                    component="img"
                    image={process.env.PUBLIC_URL + `/covers/image_${meetup.image_id}.jpg`}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {meetup.short_description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button size="small" component={Link} to={`/meetup/${meetup.slug}`} >Детальніше</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
