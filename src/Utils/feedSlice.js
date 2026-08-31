import { createSlice } from "@reduxjs/toolkit"

const feedSlice = createSlice({

    name: "Feed",

    initialState: {
        posts: [],
        page: 1,
        hasMore: true
    },

    reducers: {

        setFeedPosts: (state, action) => {
            state.posts = action.payload
        },

        addFeedPosts: (state, action) => {
            state.posts.push(...action.payload)
        },

        setFeedPage: (state, action) => {
            state.page = action.payload
        },

        setFeedHasMore: (state, action) => {
            state.hasMore = action.payload
        }

    }

})

export const {
    setFeedPosts,
    addFeedPosts,
    setFeedPage,
    setFeedHasMore
} = feedSlice.actions

export default feedSlice.reducer