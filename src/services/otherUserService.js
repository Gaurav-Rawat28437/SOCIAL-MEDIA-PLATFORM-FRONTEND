import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getUsersBySearch=async(search)=>{
    const res=await axios.get(`${API_URL}/user/search-user?search=${search}`,
        {
            withCredentials:true
        }
    )
    return res.data
}

export const getUserProfile = async (userId) => {
    const res = await axios.get(
        `${API_URL}/profile/user/${userId}`,
        {
            withCredentials: true
        }
    )
    return res.data
}
