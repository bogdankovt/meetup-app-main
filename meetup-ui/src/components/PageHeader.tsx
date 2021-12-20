import { Typography} from '@mui/material'
import React from 'react'

export default function PageHeader(props: any) {
    return (
        <Typography variant='h2' sx={{mt: '32px', mb: '16px'}}> {props.children} </Typography>
    )
}
