import {Box} from '@mui/system'
import {IconButton, Paper, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import moment from 'moment';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';


export default function Meetup({meetup}: any) {

    const circleStatusVariants: { [key: string]: any } = {
        'Draft': {border: 2, borderColor: 'success.light'},
        'Published': {bgcolor: 'success.light'},
        'Completed': {bgcolor: 'text.disabled'}
    }

    return (
        <Paper sx={{display: "flex", alignItems: 'center', justifyContent: 'space-between', px: 2, py: 0.5, mt: 2}}
               square>
            <Box sx={{display: "flex", alignItems: 'center'}}>
                <Paper elevation={0} sx={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    mr: 1.5, ...circleStatusVariants[meetup.status]
                }}/>
                <Typography variant='h6'>{meetup.title}</Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: 'center'}}>
                <Typography variant='subtitle1' sx={{mr: 2}}>
                    {moment(meetup.beginning_at).format('ddd, DD MMM, hh:mm')}
                </Typography>

                <Box sx={{width: '80px', display: 'flex', justifyContent: 'flex-end'}}>
                    {meetup.status !== 'Draft' &&
                    <IconButton sx={{p: 1}} component={Link} to={`/a/meetup/${meetup.id}/guests`}>
                        <Badge badgeContent={meetup.countRegistration} color="primary">
                            <GroupIcon/>
                        </Badge>
                    </IconButton>
                    }
                    <IconButton sx={{p: 1}} component={Link} to={`/a/meetups/${meetup.id}`}>
                        <EditIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    )
}
