import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getUserChatList=async()=>{

    const res=await axios.get(`${API_URL}/chat/user-chatList`,{
        withCredentials:true
    })

    return res.data
}

export const addUserInChatList=async(userId)=>{

    const res=await axios.patch(`${API_URL}/chat/user-chatList/${userId}`,{},{
        withCredentials:true
    })

    return res.data
}


export const getChatMessages = async (userId, page = 1, limit = 20) => {

    const response = await axios.get(
        `${API_URL}/chat/user-chatMessage/${userId}`,
        {
            params: {
                page,
                limit
            },
            withCredentials: true
        }
    )

    return response.data
}

export const markChatMessagesAsSeen = async (userId) => {
    const response = await axios.patch(
        `${API_URL}/chat/user-chatMessage/${userId}/seen`,
        {},
        {
            withCredentials: true
        }
    )

    return response.data
}