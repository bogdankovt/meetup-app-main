import { Typography} from '@mui/material'
import React from 'react'

export default function PageSubtitle(props: any) {
    return (
        <Typography variant='h3'> {props.children} </Typography>
    )
}
