
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getComments = async (postId) => {
    const response = await axios.get(
        `${API_URL}/comment/getAllComment/${postId}`,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const addComment = async (postId, content) => {
    const response = await axios.post(
        `${API_URL}/comment/create/${postId}`,
        {
            content
        },
        {
            withCredentials: true
        }
    )

    return response.data
}

export const deleteComment = async (commentId) => {
    const response = await axios.delete(
        `${API_URL}/comment/delete/${commentId}`,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const editComment = async (commentId, content) => {
    const response = await axios.put(
        `${API_URL}/comment/edit/${commentId}`,
        {
            content
        },
        {
            withCredentials: true
        }
    )

    return response.data
}

export const getMyComments = async (page = 1, limit = 18) => { 
    const response = await axios.get( `${API_URL}/comment/my-comments?page=${page}&limit=${limit}`, 
                           { withCredentials: true } ) 
    return response.data }