import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import axios from "../../../api";

export const fetchMeetupGuests = createAsyncThunk(
    'meetups/fetchMeetupGuests',
    async (id:any, {rejectWithValue}) => {
        const response: AxiosResponse = await axios.get(`/api/admin/meetup/${id}/guests`)
        {
            try {

                return await response.data;
            }   catch (e)
            {
                return rejectWithValue(e.message())
            } 
        }
        
    }
)