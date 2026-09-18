import { createSlice } from "@reduxjs/toolkit"

const otherUserSlice = createSlice({
    name: "otherUser",

    initialState: {
        data: null
    },

    reducers: {
        setOtherUser: (state, action) => {
            state.data = action.payload
        },
        userIsFollowing:(state, action)=>{
            state.data.isFollowing=action.payload
        },

        otherFollowersCount: (state, action) => {
            state.data.followersCount = action.payload
        },

        otherFollowingCount: (state, action) => {
            state.data.followingCount = action.payload
        }
    }
})

export const {
    setOtherUser,
    otherFollowersCount,
    otherFollowingCount,
    userIsFollowing
} = otherUserSlice.actions

export default otherUserSlice.reducer