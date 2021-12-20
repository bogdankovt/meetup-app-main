import {
    Box,
    Button,
    Paper, Skeleton,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Table} from '@mui/material';
import moment from 'moment'
import PageHeader from "../../../components/PageHeader";

import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from "react";
import {AdminSelector} from "../../Reducers";
import {useParams} from "react-router-dom";
import ClipboardJS from "clipboard";
import DialogActions from "@mui/material/DialogActions";
import {fetchMeetupGuests} from "./Action";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import formatPhoneNumber from "../Contacts/FormatPhoneNumber";
import { guests } from "./MeetupGuestsSlice";

export default function MeetupGuestsPage() {

    const dispatch = useDispatch()
    const params = useParams();
    useEffect(() => {
        dispatch(fetchMeetupGuests(params.id))
    }, [dispatch])

    const Active = useSelector(guests)


    console.log(Active);
    
    return (

        <div>

        </div>
    );
}

