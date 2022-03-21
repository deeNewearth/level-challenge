import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from '../store/storeTypes';
import { API_URL } from "../store/configureStore";

export type LoginProps = {
    userName: string;
    password: string;
}

export const login = createAsyncThunk(
    "auth/login",
    async (loginData: LoginProps) => {

        const response = await fetch(`${API_URL}/login`, {
            headers: { 'content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(loginData),
        });



        const done: {
            error: string;
            serverPath: string;

        } = await response.json();



        if (!response.ok) {
            throw new Error(done.error || 'failed to login');
        }



        return ({
            serverPath: done.serverPath
        });
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {} as AuthState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(login.pending, (state, action) => {

            return { loading: true };

        });
        builder.addCase(login.fulfilled, (state, action) => {
            //return {list:[...state.list||[],action.payload]};
            const { serverPath } = action.payload;

            return { serverPath };


        });
        builder.addCase(login.rejected, (state, action) => {

            return { error: action.error?.message || 'failed to login' };
        });

    },
});

export default authSlice.reducer;




