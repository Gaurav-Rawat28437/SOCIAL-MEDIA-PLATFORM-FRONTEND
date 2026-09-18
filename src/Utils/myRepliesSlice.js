
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
            action.payload.forEach(reply => {
                const exists = state.replies.some(
                    item => item._id === reply._id
                )

                if (!exists) {
                    state.replies.push(reply)
                }
            })
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
        },

        addReply: (state, action) => {
            const exists = state.replies.some(
                reply => reply._id === action.payload._id
            )

            if (!exists) {
                state.replies.unshift(action.payload)
            }
        },
        updateReplyComments: (state, action) => {
            state.replies.forEach(reply => {
                if (reply.post?._id === action.payload.postId) {
                    reply.post.commentsCount = action.payload.commentsCount
                }
            })
        },
        removeReply: (state, action) => {
            state.replies = state.replies.filter(
                reply => reply._id !== action.payload
            )
        },
        updateReply: (state, action) => {
            const reply = state.replies.find(
                reply => reply._id === action.payload.commentId
            )

            if (reply) {
                reply.content = action.payload.content
            }
        },
        updateReplyLike: (state, action) => {
            state.replies.forEach(reply => {
                if (reply.post?._id === action.payload.postId) {
                    reply.post.isLiked = action.payload.isLiked
                    reply.post.likesCount = action.payload.likesCount
                }
            })
        }
    }
})

export const {
    setReplies,
    addReplies,
    setHasMore,
    setPage,
    clearReplies,
    addReply,
    updateReplyComments,
    removeReply,
    updateReply,
    updateReplyLike
} = myRepliesSlice.actions

export default myRepliesSlice.reducer

