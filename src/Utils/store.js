import {configureStore} from "@reduxjs/toolkit"
import UsersSliceReducer from "./usersSlice"

const store=configureStore({
    
    reducer:{
        "User":UsersSliceReducer
    }
})

export default store