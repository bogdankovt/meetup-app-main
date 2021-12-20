import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from '../../../api'

export const fetchStatistics = createAsyncThunk(
    'meetups/fetchStatistics',
    async () => {
        const response: AxiosResponse = await axios.get(`/api/admin/statistics`)
        return await response.data;
    }
)


const initialState = {
    data: []
}


const MeetupsStatistic = createSlice({
    name: 'statistics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStatistics.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const statisticSelector = (state: any) => state.admin.statistics
export default MeetupsStatistic.reducer;