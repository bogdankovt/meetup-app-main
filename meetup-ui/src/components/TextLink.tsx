import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function TextLink({to,sx,color,...props} : any) {
    return (
        <Typography component={Link} to={to} color={color ? color : 'inherit'} {...props} sx={{textDecoration: "none", ...sx}}>{props.children}</Typography>

    )
}
