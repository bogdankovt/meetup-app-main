import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {AxiosResponse} from 'axios'
import axios from '../../../api'

export const fetchMeetups = createAsyncThunk(
    'meetups/fetchMeetups',
    async () => {
        const response: AxiosResponse = await axios.get(`/api/admin/meetups`);
        return await response.data;
    }
)

const initialState = {
    isLoading: false,
    data: []
}


const Meetups = createSlice({
    name: 'meetups',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMeetups.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMeetups.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
      },
})

export default Meetups.reducer