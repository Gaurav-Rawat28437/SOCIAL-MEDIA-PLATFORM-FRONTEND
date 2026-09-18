import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginUser } from "../services/authService"

export const userSliceThunk = createAsyncThunk("get-user-date", async (email, password, username) => {

    const data = loginUser(email, password, username)
    console.log(data)
    return data
})


const userReducer = createSlice({
    name: "User",
    initialState: {
        data: {},
        isLogin: false
    },
    reducers: {
        addUserData: (state, action) => {
            return {
                ...state,
                data: action.payload,
                isLogin: true
            }
        },

        removeUserData: (state, action) => {
            return {
                ...state,
                data: {},
                isLogin: false
            }
        },
        postCount: (state, action) => {
            state.data.postCount = action.payload
        },
        thoughtCount: (state, action) => {
            state.data.thoughtCount = action.payload
        },
        loggedInUserFollowersCount:(state, action)=>{
            state.data.followerCount = action.payload
        },
        loggedInUserFollowingCount:(state, action)=>{
            state.data.followingCount = action.payload
        }
      }

})

export const { addUserData, removeUserData, postCount, thoughtCount,loggedInUserFollowersCount,loggedInUserFollowingCount } = userReducer.actions
export default userReducer.reducer