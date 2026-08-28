import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginUser } from "../services/authService"

export const userSliceThunk=createAsyncThunk("get-user-date",async(email,password,username)=>{
    
    const data=loginUser(email,password,username)
    console.log(data)
    return data
})


const userReducer=createSlice({
    name:"User",
    initialState:{
        data:{},
        isLogin:false
    },
    reducers:{
        addUserData:(state,action)=>{
        return{
            ...state,
            data:action.payload,
            isLogin:true
        }},

        removeUserData:(state,action)=>{
            return{
                 ...state,
            data:{},
            isLogin:false
            }
        }
    },

})

export const {addUserData,removeUserData}=userReducer.actions
export default userReducer.reducer