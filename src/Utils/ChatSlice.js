import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserChatList } from "../services/chatService";


export const chatListThunk = createAsyncThunk("get-chatList", async () => {
    try {
        const res = await getUserChatList()
        return res.data
    }
    catch (error) {
        throw error
    }
})

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {

        increaseUnreadCount: (state, action) => {

            if (!state.data?.chatList) return

            state.data.chatList = state.data.chatList.map(user =>
                user._id === action.payload
                    ? {
                        ...user,
                        unreadCount: (user.unreadCount || 0) + 1
                    }
                    : user
            )
        },

        clearUnreadCount: (state, action) => {

            if (!state.data?.chatList) return

            state.data.chatList = state.data.chatList.map(user =>
                user._id === action.payload
                    ? {
                        ...user,
                        unreadCount: 0
                    }
                    : user
            )
        },
        moveChatUserToTop: (state, action) => {

            if (!state.data?.chatList) return

            const userId = action.payload

            const user = state.data.chatList.find(
                item => item._id === userId
            )

            if (!user) return

            state.data.chatList = [
                user,
                ...state.data.chatList.filter(
                    item => item._id !== userId
                )
            ]
        },
        addChatUserInRedux: (state, action) => {

            if (!state.data?.chatList) return

            const user = action.payload

            const alreadyExists = state.data.chatList.some(
                item => item._id === user._id
            )

            if (alreadyExists) return

            state.data.chatList.unshift({
                ...user,
                unreadCount: 0
            })
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(chatListThunk.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(chatListThunk.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload
                }
            })
            .addCase(chatListThunk.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message
                }
            })
    }
})
export const {
    increaseUnreadCount,
    clearUnreadCount,
    moveChatUserToTop,
    addChatUserInRedux
} = chatSlice.actions
export default chatSlice.reducer