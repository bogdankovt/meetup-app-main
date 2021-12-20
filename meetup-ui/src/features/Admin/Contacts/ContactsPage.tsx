import {
    Button,
    Paper, Skeleton,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Table} from '@mui/material';
import moment from 'moment'
import PageHeader from "../../../components/PageHeader";

import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from "react";
import {AdminSelector} from "../../Reducers";
import ClipboardJS from "clipboard";
import DialogActions from "@mui/material/DialogActions";
import {fetchContacts} from "./Action";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import formatPhoneNumber from "./FormatPhoneNumber";

export default function MeetupGuestsPage() {
    const dispatch = useDispatch()
    useEffect(() => {
        new ClipboardJS('.btn');
        dispatch(fetchContacts())
    }, [dispatch])

    const admin = useSelector(AdminSelector)


    return (

        <div>

            {admin.contacts._isLoading ?
                <>
                    <PageHeader>Завантаження</PageHeader>
                    <Skeleton variant="text" sx={{mt: 1, height: '48px', width: '20%'}}/>
                    <Skeleton variant="rectangular" sx={{mt: 1, height: '48px'}}/>
                    <Skeleton variant="rectangular" sx={{mt: 1, height: '48px'}}/>
                    <Skeleton variant="rectangular" sx={{mt: 1, height: '48px'}}/>
                </>
                :
                <>

                    <PageHeader>Контакти</PageHeader>

                    <DialogActions style={{justifyContent: 'end', paddingLeft: 0, paddingBottom: "32px"}}>
                        <Button startIcon={<ContentCopyIcon/>} color="primary" variant="outlined"
                                children="Копіювати дані" className="btn"
                                data-clipboard-target="#contacts"/>
                    </DialogActions>

                    <Paper sx={{overflowX: "auto"}}>

                        < TableContainer component={Paper}>
                            <Table id="contacts" aria-label="simple table">
                                <TableHead>
                                    <TableRow style={{height: "56px", fontVariant: "body1", fontWeight: "700"}}>
                                        <TableCell align="left">Прізвище&nbsp; та&nbsp; ім’я</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left" sx={{width: "150px"}}>Телефон</TableCell>
                                        <TableCell sx={{width: "25px"}} align="left">Вік</TableCell>
                                        <TableCell sx={{width: "140px"}} align="left">Діяльність</TableCell>
                                        <TableCell sx={{width: "51px"}} align="left">ВНЗ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {admin.contacts.contacts.map((guest: any) => (
                                        <TableRow
                                            key={guest.id}
                                            sx={{
                                                height: "52px",
                                                fontVariant: "body1",
                                                '&:last-child td, &:last-child th': {border: 0}
                                            }}>
                                            
                                            
                                            { guest.socialUrl ?
                                                <>
                                                    <TableCell align="left" component="th" scope="row"> <a
                                                        style={{color: 'primary.main'}}
                                                        href={`${guest.socialUrl}`}
                                                        target="_blank">{guest.firstName + " " + guest.lastName}</ a></TableCell>
                                                </>
                                                :
                                                <>
                                                    <TableCell align="left" component="th" scope="row">
                                                        {guest.firstName + " " + guest.lastName}
                                                    </TableCell>
                                                </>
                                            }

                                            <TableCell
                                                align="left"><a style={{color: 'primary.main'}}
                                                                href={`mailto:${guest.email}`}>{guest.email}</ a></TableCell>
                                            <TableCell
                                                align="left"><a style={{color: 'primary.main', width: "140px"}}
                                                                href={`tel:${guest.phone}`}>{formatPhoneNumber(guest.phone)}</ a></TableCell>
                                            <TableCell sx={{width: "25px"}}
                                                       align="right">{moment().diff(guest.birthday, 'years')}</TableCell>
                                            <TableCell sx={{width: "150px"}}
                                                       align="left">{guest.activity.name}</TableCell>
                                            <TableCell sx={{width: "51px"}}
                                                       align="left">{guest.institution == null ? "" : guest.institution.name}</TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                </>
            }
        </div>
    );
}

