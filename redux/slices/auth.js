import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});


export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    console.log(data)
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload;

            state.status = 'loaded';
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null
        }
        ,

    }
});

export const selectIsAuth = (state) => {
    if (state.auth.data) {
        return true
    }

}

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;