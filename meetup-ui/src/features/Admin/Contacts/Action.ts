import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import axios from "../../../api";

export const fetchContacts = createAsyncThunk(
    'meetups/fetchGuests',
    async (_, {rejectWithValue}) => {
        const response: AxiosResponse = await axios.get(`/api/admin/contacts`)
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