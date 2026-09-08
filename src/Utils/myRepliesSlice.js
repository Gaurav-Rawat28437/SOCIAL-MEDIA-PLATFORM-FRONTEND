import { createSlice } from "@reduxjs/toolkit"

const myRepliesSlice = createSlice({
    name: "MyReplies",

    initialState: {
        replies: [],
        hasMore: false,
        page: 1,
        loaded: false
    },

    reducers: {
        setReplies: (state, action) => {
            state.replies = action.payload
            state.loaded = true
        },

        addReplies: (state, action) => {
            state.replies.push(...action.payload)
        },

        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        setPage: (state, action) => {
            state.page = action.payload
        },

        clearReplies: (state) => {
            state.replies = []
            state.hasMore = false
            state.page = 1
            state.loaded = false
        }
    }
})

export const {
    setReplies,
    addReplies,
    setHasMore,
    setPage,
    clearReplies
} = myRepliesSlice.actions

export default myRepliesSlice.reducer