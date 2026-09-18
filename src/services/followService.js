import axios from "axios"

const API = import.meta.env.VITE_API_URL

export const followUser = async (userId) => {
    
        const response = await axios.post(
            `${API}/user/follow/${userId}`,
            {},
            {
                withCredentials: true
            }
        )
        console.log(response.data)

        return response.data
   
}

export const unfollowUser = async (userId) => {
    
        const response = await axios.delete(
            `${API}/user/follow/${userId}`,
            {
                withCredentials: true
            }
        )

        return response.data
   
}

export const getFollowers = async (userId, page = 1, limit = 10) => {
    
        const response = await axios.get(
            `${API}/user/follow/${userId}/followers?page=${page}&limit=${limit}`,
            {
                withCredentials: true
            }
        )

        return response.data
    
}

export const getFollowing = async (userId, page = 1, limit = 10) => {
  
        const response = await axios.get(
            `${API}/user/follow/${userId}/following`,
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