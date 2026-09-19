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
            const newPosts = action.payload.filter(
                newPost => !state.posts.some(
                    post => post._id === newPost._id
                )
            )

            state.posts.push(...newPosts)
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
        },
        removeFeedPost: (state, action) => {
            state.posts = state.posts.filter(
                post => post._id !== action.payload
            )
        },
        updateFeedPost: (state, action) => {
            state.posts = state.posts.map(post =>
                post._id === action.payload._id
                    ? action.payload
                    : post
            )
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
    updateFeedPostComments,
    removeFeedPost,
    updateFeedPost
} = feedSlice.actions

export default feedSlice.reducer