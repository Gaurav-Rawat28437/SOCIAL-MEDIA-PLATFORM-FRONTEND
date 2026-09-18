import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const likePost = async (postId) => {

    const response = await axios.post(
        `${API_URL}/like/${postId}`,
        {},
        {
            withCredentials: true
        }
    )

    return response.data
}

export const unlikePost = async (postId) => {

    const response = await axios.delete(
        `${API_URL}/like/${postId}`,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const getMyLikes = async (page = 1, limit = 18) => {
    const response = await axios.get(
        `${API_URL}/like/my-likes`,
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