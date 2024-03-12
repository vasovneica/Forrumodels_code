import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async (params) => {
    const { tabValue, tag } = params;
    console.log(params);
    const { data } = await axios.get(`/posts/sort/${tabValue}/tag/${tag}`);

    return data;
});

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {

    const { data } = await axios.get('/tags');
    return data;
});

export const fetchDeletePost = createAsyncThunk('/posts/fetchDeletePost', async (id) => {

    await axios.delete(`/posts/${id}`);

});

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },


    }
});

export const postsReducer = postsSlice.reducer;
