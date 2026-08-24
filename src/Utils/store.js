import {configureStore} from "@reduxjs/toolkit"
import UsersSliceReducer from "./usersSlice"

const store=configureStore({
    name:"User",
    reducer:{"User":UsersSliceReducer}
})

export default store