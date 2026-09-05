import { createSlice } from "@reduxjs/toolkit"

const thoughtsSlice = createSlice({
    name: "Thought",
    initialState: {
        thoughts: [],
        hasMore: false,
        page: 1
    },

    reducers: {

        setThoughts: (state, action) => {
            state.thoughts = action.payload
        },

        addThought: (state, action) => {
            state.thoughts.unshift(action.payload)
        },

        addThoughts: (state, action) => {
            state.thoughts.push(...action.payload)
        },

        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        setPage: (state, action) => {
            state.page = action.payload
        },

        removeThought: (state, action) => {
            state.thoughts = state.thoughts.filter(
                thought => thought._id !== action.payload
            )
        },

        updateThought: (state, action) => {
            state.thoughts = state.thoughts.map(thought =>
                thought._id === action.payload._id
                    ? action.payload
                    : thought
            )
        },

        updateThoughtLike: (state, action) => {
            const thought = state.thoughts.find(
                thought => thought._id === action.payload.postId
            )

            if (thought) {
                thought.isLiked = action.payload.isLiked
                thought.likesCount = action.payload.likesCount
            }
        }

    }
})

export const {
    setThoughts,
    addThought,
    addThoughts,
    setHasMore,
    setPage,
    removeThought,
    updateThought,
    updateThoughtLike
} = thoughtsSlice.actions

export default thoughtsSlice.reducer