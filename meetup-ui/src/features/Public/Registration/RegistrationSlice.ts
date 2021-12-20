import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registration_response: {
        isRegistrated: false,
        data: {}
    }
}

const Registration = createSlice({
    name: 'Registration',
    initialState,
    reducers: {
        setRegistration: (state, action) => {
            if (action.payload.status === 201) {
                state.registration_response = { isRegistrated: true, data: action.payload.data }
            }
            else {
                state.registration_response = { isRegistrated: false, data: {} }
            }
        }
    }
})


export const registrationSelector = (state: any) => state.public.registration
export const { setRegistration } = Registration.actions

export default Registration.reducer
