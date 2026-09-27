import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({

    name: "notification",

    initialState: {
        notifications: [],
        unreadCount: 0,
        hasMore: true
    },

    reducers: {

        setNotifications: (state, action) => {
            state.notifications = action.payload
        },

        addNotifications: (state, action) => {
            state.notifications.push(...action.payload)
        },

        addNotification: (state, action) => {
            state.notifications.unshift(action.payload)
        },

        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        increaseUnreadNotification: (state) => {
            state.unreadCount += 1
        },

        decreaseUnreadNotification: (state) => {
            state.unreadCount -= 1
        },

        setUnreadNotificationCount: (state, action) => {
            state.unreadCount = action.payload
        },

        clearUnreadNotificationCount: (state) => {
            state.unreadCount = 0
        }

    }

})

export const {
    setNotifications,
    addNotifications,
    addNotification,
    setHasMore,
    increaseUnreadNotification,
    setUnreadNotificationCount,
    clearUnreadNotificationCount,
    decreaseUnreadNotification
} = notificationSlice.actions

export default notificationSlice.reducer