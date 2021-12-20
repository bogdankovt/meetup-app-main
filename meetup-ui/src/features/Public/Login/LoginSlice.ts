import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import api from "../../../api";
import { RootState } from "../../../app/store";

interface UserState {
    authenticated: boolean;
    displayName: string;
    role: string;
}
interface LoginState {
    data: UserState,
    error: boolean
}

interface LoginCredentials {
    email: string;
    password: string;
}

const initialState: LoginState = {
    data: {
        authenticated: false,
        displayName: '',
        role: 'Anonym',
    },
    error: false
}

export const login = createAsyncThunk(
    'user/login',
    async (loginCredentials: LoginCredentials) => {
        const response: AxiosResponse = await api.post('api/auth/login', loginCredentials)
        return response.data
    })

export const getAuthStatus = createAsyncThunk(
    'user/setStatus',
    async () => {
        const response: AxiosResponse = await api.get('api/auth/status')
        return response.data
    })

export const logout = createAsyncThunk(
    'user/logout',
    async (currentURL: string) => {
        const response: AxiosResponse = await api.delete('api/auth/cookie')
        return response.data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoginError: (state, action: PayloadAction<boolean>) => {
            state.error = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.error = false
                state.data.authenticated = action.payload.authenticated
                state.data.displayName = action.payload.displayName
                state.data.role = action.payload.role
            })
            .addCase(login.rejected, (state, action) => {
                state.error = true
            })
            .addCase(getAuthStatus.fulfilled, (state, action) => {
                state.data.authenticated = action.payload.authenticated
                state.data.displayName = action.payload.displayName
                state.data.role = action.payload.role
            })
            .addCase(logout.fulfilled, (state, action) => {
                return initialState
            })
    }
})

export const { setLoginError } = userSlice.actions
export const userSelector = (state: RootState) => state.user.data
export const loginErrorSelector = (state: RootState) => state.user.error
export const userAuth = (state: RootState) => state.user.data.authenticated

export default userSlice.reducer
