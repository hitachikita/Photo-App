import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    // thunkAPI.dispatch(...)
    const currentUser = await userApi.postAll(params);
    return currentUser;
});

const initialUser = {
    current: {
        // id: 1,
        // email: "duongthanhbinhfb@gmail.com",
        // password: "12345",
        // status: 0,
        // name: "Dương Thanh Bình",
        // imgUrl: "https://lh3.googleusercontent.com/ogw/ADGmqu-aALNvtMzrT-uHg_HJkcYwiyfuI9YMpK95r7hD=s83-c-mo",
    },
    loading: false,
    error: '',
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {
        signOut: (state, action) => {
            state = initialUser;
            return state;
        },
        updateUser: (state, action) => {
            const newName = action.payload;
            state.current.user.name = newName;
        }
    },

    extraReducers: {
        [getMe.pending]: (state) => {
            state.loading = true;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMe.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payload;
        },
    }
});

const { reducer: userReducer, actions } = userSlice;
export const { signOut: signOutUser, updateUser } = actions;
export default userReducer;