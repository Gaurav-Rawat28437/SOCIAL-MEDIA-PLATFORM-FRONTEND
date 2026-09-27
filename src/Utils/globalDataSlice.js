import { createSlice } from "@reduxjs/toolkit"

const globalDataSlice = createSlice({
    name: "globalData",
    initialState: {
        totalUnreadMessages: 0
    },
    reducers: {
        setTotalUnreadMessages: (state, action) => {
            state.totalUnreadMessages = action.payload
        },
        increaseTotalUnreadMessages: (state) => {
            state.totalUnreadMessages += 1
        },
        decreaseTotalUnreadMessages: (state, action) => {
            state.totalUnreadMessages = Math.max(
                0,
                state.totalUnreadMessages - action.payload
            )
        }
    }
})

export const {
    setTotalUnreadMessages,
    increaseTotalUnreadMessages,
    decreaseTotalUnreadMessages
} = globalDataSlice.actions

export default globalDataSlice.reducer