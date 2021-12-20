import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    meetups: []
}

const MeetupFeed = createSlice({
    name: 'meetups',
    initialState,
    reducers: {
        setMeetups: (state, action) => {
            state.meetups = action.payload
        }
    }
})

export const {setMeetups} = MeetupFeed.actions;
export const meetupFeedSelector = (state: any) => state.public.meetupFeed
export default MeetupFeed.reducer;