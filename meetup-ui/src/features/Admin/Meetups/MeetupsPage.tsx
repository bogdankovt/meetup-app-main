import { Avatar, Box, Button, IconButton, Input, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeetups } from './MeetupsSlice'
import { AdminSelector } from '../../Reducers'
import _ from 'lodash'
import MeetupsGroup from './MeetupsGroup'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import { PhotoCamera, UploadFile } from '@mui/icons-material'
import axios from '../../../api'


export default function MeetupsPage() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMeetups())
    }, [])
    
    const admin = useSelector(AdminSelector)

    const meetupsGroup = _(admin.meetups.data)
                        .groupBy(m => m.status)
                        .value()    



    ///upload images
    const [file, setFile] = useState<string>();
    const [fileName, setFileName] = useState<string>();
                    
    const saveFile = (e: any) => {
        if(e.target.files[0]) {
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
        } 
    }

    const uploadImage = (e: any) => {
        const formData = new FormData()

        formData.append('formFile', file as string)
        formData.append('fileName', fileName as string)

        axios.post("/image", formData)
    }

    /////

    return (
        <div>
            <PageHeader>Управління мітапами</PageHeader>

            {admin.meetups.isLoading ? 
            <>
                <Skeleton variant="text" sx={{mt:1, height: '48px', width: '20%'}} />
                <Skeleton variant="rectangular" sx={{mt:1, height: '48px'}} />
                <Skeleton variant="rectangular" sx={{mt:1, height: '48px'}} />
                <Skeleton variant="rectangular" sx={{mt:1, height: '48px'}} />
            </>
            :  
            <>
                <MeetupsGroup title='Чернетки' meetups={meetupsGroup.Draft ? meetupsGroup.Draft : []}>
                    <Button variant="outlined" sx={{color: 'success.main', mt:1}} startIcon={<AddIcon />} component={Link} to='/a/meetups/create'>Створити новий</Button>
                </MeetupsGroup>
                <MeetupsGroup title='Опубліковані' meetups={meetupsGroup.Published}></MeetupsGroup>
                <MeetupsGroup title='Виконані' meetups={meetupsGroup.Completed}></MeetupsGroup>
            </>
            }

            
            {/* upload images  */}
            <label htmlFor="icon-button-file">
            <Input id="icon-button-file" type="file" onChange={saveFile} sx={{display: 'none'}}/>
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
            </label>

            <Button variant='text' onClick={uploadImage}>Upload</Button>
            {file && <Box
                component="img"
                sx={{
                height: 270,
                width: 510
                }}
                src={URL.createObjectURL(file)}
            />}

            {/* ///// */}
        </div>
    )
}
