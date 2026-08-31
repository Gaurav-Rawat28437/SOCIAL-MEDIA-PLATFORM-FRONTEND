import { createSlice } from "@reduxjs/toolkit"

const postsSlice = createSlice({
    name: "Post",

    initialState: {
        posts: [],
        hasMore: false,
        page: 1
    },

    reducers: {

        setPosts: (state, action) => {
            state.posts = action.payload
        },

        addPosts: (state, action) => {
            state.posts.push(...action.payload)
        },

        addPost: (state, action) => {
            state.posts.unshift(action.payload)
        },

        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        setPage: (state, action) => {
            state.page = action.payload
        },

        removePost: (state, action) => {
            state.posts = state.posts.filter(
                post => post._id !== action.payload
            )
        },

        updatePost: (state, action) => {

            state.posts = state.posts.map(post =>
                post._id === action.payload._id
                    ? action.payload
                    : post
            )

        }

    }
})

export const {
    setPosts,
    addPosts,
    addPost,
    setHasMore,
    setPage,
    removePost,
    updatePost
} = postsSlice.actions

export default postsSlice.reducer