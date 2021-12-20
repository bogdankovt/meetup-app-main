import {createSlice} from "@reduxjs/toolkit";
import {fetchMeetupGuests} from "./Action";
import _ from 'lodash'
import { AdminSelector } from "../../Reducers";
import { ClassNames } from "@emotion/react";

const statuses = ['Ignored']


const initialState = {
    _isLoading: true,
    _IsError:false,
    meetup: {
        guests: {}
    },
    error: null
}

const MeetupGuests = createSlice({
    name: 'meetupGuests',
    initialState,
    reducers: {

    },
    
    extraReducers: (builder) => {
        builder.addCase(fetchMeetupGuests.pending, (state) => {
            state._isLoading = true;
        })
        builder.addCase(fetchMeetupGuests.fulfilled, (state, action) => {
            state._isLoading = false;
            state.meetup = {...action.payload, guests: _.groupBy(action.payload.guests, t => t.status)};
        })
        builder.addCase(fetchMeetupGuests.rejected, (state, action) => {
            state._isLoading = false;
            state._IsError  = true;
        });
    }
})

export const guests = (state: any) => {
    var guests = state.admin.meetupGuests.meetup.guests;
    return Object.keys(guests).reduce((res, curr: any) => !statuses.includes(curr) ? res.concat(guests[curr]) : res, [])
}

// export const getGuests = (s = guests) => {
//     return Object.keys(guests).reduce((x:any, y:any) => [...s[y]], [])
// }
export default MeetupGuests.reducer
