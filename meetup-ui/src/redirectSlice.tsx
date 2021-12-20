import { Action, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "./api";
import { RootState } from "./app/store";
import { login, logout } from "./features/Public/Login/LoginSlice";


interface RedirectOptions {
    to: string;
    backURL: string;
}

const initialState: RedirectOptions = {
    to: '',
    backURL: ''
}

const redirectSlice = createSlice({
    name: 'redirect',
    initialState,
    reducers: {
        redirect: (state, action: PayloadAction<RedirectOptions>) => {
            return action.payload;
        },
        resetTo: (state) => {
            state.to = '';
        },
        setBackURL: (state, action: PayloadAction<string>) => {
            state.backURL = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (state.backURL) {
                    state.to = state.backURL;
                    state.backURL = '';
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                if(action.meta.arg.includes('/a/')){
                    state.to = '/';
                    state.backURL = '';
                }
            })
    }
})


export const { redirect, resetTo, setBackURL } = redirectSlice.actions
export const toSelector = (state: RootState) => state.redirect.to
export const backURLSelector = (state: RootState) => state.redirect.backURL
export default redirectSlice.reducer
