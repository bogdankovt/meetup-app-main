import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { boolean } from "yup/lib/locale";
import api from "../../../api";
import { RootState } from "../../../app/store";
import { login, logout } from "../Login/LoginSlice";

interface MeetupDetailsState {
    details: {
        title: string,
        long_description: string,
        beginning_at: string,
        registration_deadline: string,
        duration: string,
        image_id: string,
        status: string,
        location: string,
        slug: string,
        registration_status: string
    },
    loading: boolean,
    alert: {
        open: boolean,
        variant: "success" | "error" | "info" | "warning" | undefined,
        message: string,
    }
}

const initialState: MeetupDetailsState = {
    details: {
        title: "",
        long_description: "",
        beginning_at: "",
        registration_deadline: "",
        duration: "",
        image_id: "",
        status: "",
        location: "",
        slug: "",
        registration_status: ""
    },
    loading: false,
    alert: {
        open: false,
        variant: undefined,
        message: "",
    }
}
export const registrationOnMeetup = createAsyncThunk(
    'meetup/registration',
    async (info: {meetupSlug: any, meetupSource: string}) => {
        const response: AxiosResponse = await api({
            method: 'post',
            url: `api/guest/meetup/${info.meetupSlug}/registration`,
            headers: {'Content-type': 'application/json'},
            data: {
                "source": info.meetupSource
            }
        })
        return response.data

    }
) 

const MeetupGuests = createSlice({
    name: 'currentMeetupDetails',
    initialState,
    reducers: {
        setCurrentMeetupDetails: (state, action) => {
            state.details = action.payload;
        },
        closeAlert: (state, action) => {
            state.alert.open = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registrationOnMeetup.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(registrationOnMeetup.fulfilled, (state, action) => {
                state.details.registration_status = action.payload.status
                state.alert = {open: true, variant: "success", message: "Реєстрація пройшла успішно"}
                state.loading = false
            })
            .addCase(registrationOnMeetup.rejected, (state, action) => {
                state.alert = {open: true, variant: "error", message: "Щось пішло не так :("}
                state.loading = false
            })
            .addCase(login.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {              
                state.loading = false;
                state.details.registration_status = '';
            })
            .addCase(logout.fulfilled, (state, action) => {         
                state.details.registration_status = '';
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            })
    }
});

export const currentMeetupsSelector = (state: RootState) => state.public.currentMeetupDetails;
export const { setCurrentMeetupDetails } = MeetupGuests.actions;
export const { closeAlert } = MeetupGuests.actions;

export default MeetupGuests.reducer;
