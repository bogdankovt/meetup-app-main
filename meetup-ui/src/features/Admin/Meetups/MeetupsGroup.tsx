import { Box } from '@mui/system'
import React from 'react'
import PageSubtitle from '../../../components/PageSubtitle'
import Meetup from './Meetup'

export default function MeetupsGroup({title, meetups, children} : any) {
    return (
        <>
            {meetups ? 
            <Box sx={{mb: 6}}>
                <PageSubtitle>{title}</PageSubtitle>       
                {meetups.map((m: any, i: any) => <Meetup meetup={m} key={i}/>)}
                {children}
            </Box>
            :  <></>

            }
        </>
    )
}
