import {configureStore} from "@reduxjs/toolkit"
import UsersSliceReducer from "./usersSlice"
import postReducer from "./postsSlice"
import feedReducer from "./feedSlice"
import thoughtsReducer from "./thoughtsSlice"

const store=configureStore({
    
    reducer:{
        "User":UsersSliceReducer,
        "Post": postReducer,
        "Feed": feedReducer,
        "Thought": thoughtsReducer
    }
})

export default store