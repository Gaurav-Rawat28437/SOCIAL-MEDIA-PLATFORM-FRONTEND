import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getUsersBySearch = async (search = "", page = 1, limit = 20) => {

    const res = await axios.get(
        `${API_URL}/user/search-user`,
        {
            params: {
                search,
                page,
                limit
            },
            withCredentials: true
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
