import { createSlice } from "@reduxjs/toolkit"


const userReducer=createSlice({
    name:"User",
    initialState:{
        data:null,
        isLogin:false
    },
    reducers:{
        login:(state,action)=>{
        return{
            ...state,
            data:action.payload,
            isLogin:true
        }},

        logout:(state,action)=>{
            return{
                 ...state,
            data:null,
            isLogin:false
            }
        }
    }
})

export const {login,logout}=userReducer.actions
export default userReducer.reducer