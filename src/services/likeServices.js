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