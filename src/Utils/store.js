import {configureStore} from "@reduxjs/toolkit"
import UsersSliceReducer from "./usersSlice"
import postReducer from "./postsSlice"
import feedReducer from "./feedSlice"
import thoughtsReducer from "./thoughtsSlice"
import myRepliesReducer from "./myRepliesSlice"
import myLikesReducer from "./myLikesSlice"
import otherUserSliceReducer from "./otherUserSlice"
import chatListSliceReducer from "./ChatSlice"
import globalDataReducer from "./globalDataSlice"
import notificationReducer from "./notificationSlice"

const store=configureStore({
    
    reducer:{
        "User":UsersSliceReducer,
        "Post": postReducer,
        "Feed": feedReducer,
        "Thought": thoughtsReducer,
        "MyReplies": myRepliesReducer,
        "MyLikes": myLikesReducer,
        "otherUser":otherUserSliceReducer,
        "userChat":chatListSliceReducer,
        "globalData": globalDataReducer,
        "notification":notificationReducer
    }
})

export default store