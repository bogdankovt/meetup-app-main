import {createSlice} from "@reduxjs/toolkit";
import {fetchContacts} from "./Action";

const initialState = {
    _isLoading: true,
    contacts: [],

}

const contacts = createSlice({
    name: 'contacts',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state._isLoading = true;
        })
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state._isLoading = false;
            state.contacts = action.payload;
        })
/*        builder.addCase(fetchMeetupGuests.rejected, (state, action) => {
            state.meetupGuests = [];
            state._isLoading = false;
            state._IsError  = true;
        });*/
    }
})
export default contacts.reducer
