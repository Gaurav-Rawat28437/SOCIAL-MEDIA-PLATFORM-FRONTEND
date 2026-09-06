import { createSlice } from "@reduxjs/toolkit"

const postsSlice = createSlice({
    name: "Post",

    initialState: {
        posts: [],
        hasMore: false,
        page: 1,
        loaded: false
    },

    reducers: {

        setPosts: (state, action) => {
            state.posts = action.payload
            state.loaded = true
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

        },
        updateLike: (state, action) => {

            const { postId, isLiked, likesCount } = action.payload

            state.posts = state.posts.map(post =>
                post._id === postId
                    ? {
                        ...post,
                        isLiked,
                        likesCount
                    }
                    : post
            )
        },
        updatePostComments: (state, action) => {
            state.posts = state.posts.map(post =>
                post._id === action.payload.postId
                    ? {
                        ...post,
                        commentsCount: action.payload.commentsCount
                    }
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
    updatePost,
    updateLike,
    updatePostComments
} = postsSlice.actions

export default postsSlice.reducer