import { createSlice } from "@reduxjs/toolkit"

const myLikesSlice = createSlice({
    name: "MyLikes",

    initialState: {
        likes: [],
        hasMore: false,
        page: 1,
        loaded: false
    },

    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload
            state.loaded = true
        },

        addLikes: (state, action) => {
            action.payload.forEach(like => {
                const exists = state.likes.some(
                    item => item._id === like._id
                )

                if (!exists) {
                    state.likes.push(like)
                }
            })
        },

        addLike: (state, action) => { state.likes.unshift(action.payload) },

        removeLike: (state, action) => {
            state.likes = state.likes.filter(
                like => like.post?._id !== action.payload
            )
        },

        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        setPage: (state, action) => {
            state.page = action.payload
        },

        clearLikes: (state) => {
            state.likes = []
            state.hasMore = false
            state.page = 1
            state.loaded = false
        },
        updateLikeComments: (state, action) => {
            state.likes.forEach(like => {
                if (like.post?._id === action.payload.postId) {
                    like.post.commentsCount = action.payload.commentsCount
                }
            })
        }
    }
})

export const {
    setLikes,
    addLikes,
    addLike,
    removeLike,
    setHasMore,
    setPage,
    clearLikes,
    updateLikeComments
} = myLikesSlice.actions

export default myLikesSlice.reducer