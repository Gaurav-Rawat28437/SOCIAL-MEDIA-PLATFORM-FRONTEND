import { createSlice } from "@reduxjs/toolkit"

const feedSlice = createSlice({

    name: "Feed",

    initialState: {
        posts: [],
        page: 1,
        hasMore: true,
        loaded: false
    },

    reducers: {

        setFeedPosts: (state, action) => {
            state.posts = action.payload
            state.loaded = true
        },

        addFeedPosts: (state, action) => {
            state.posts.push(...action.payload)
        },

        addFeedPost: (state, action) => {
            state.posts.unshift(action.payload)
        },

        setFeedPage: (state, action) => {
            state.page = action.payload
        },

        setFeedHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        updateFeedPostLike: (state, action) => {

            const post = state.posts.find(
                post => post._id === action.payload.postId
            )

            if (post) {
                post.isLiked = action.payload.isLiked
                post.likesCount = action.payload.likesCount
            }

        },
        updateFeedPostComments: (state, action) => {
            const post = state.posts.find(
                post => post._id === action.payload.postId
            )

            if (post) {
                post.commentsCount = action.payload.commentsCount
            }
        }

    }

})

export const {
    setFeedPosts,
    addFeedPosts,
    addFeedPost,
    setFeedPage,
    setFeedHasMore,
    updateFeedPostLike,
    updateFeedPostComments
} = feedSlice.actions

export default feedSlice.reducer