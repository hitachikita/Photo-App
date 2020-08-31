import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    // thunkAPI.dispatch(...)
    const currentUser = await userApi.postAll(params);
    return currentUser;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getMe.pending]: (state) => {
            state.loading = true;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMe.pending]: (state, action) => {
            state.loading = false;
            state.current = action.payload;
        },
    }
});

const { reducer: userReducer } = userSlice;
export default userSlice;