import axios from "axios"

export const createPost=async(postData)=>{

    const res=await axios.post(`${import.meta.env.VITE_API_URL}/post/create`,postData,{withCredentials:true})
    return res.data
}

export const getMyPosts = async (page = 1, limit = 20) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/my-posts?page=${page}&limit=${limit}`,{withCredentials: true}
    )

    return res.data
}

export const deletePost = async (postId) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/post/delete/${postId}`,
        {
            withCredentials: true
        }
    )

    return response.data
}

export const editPost = async (postId, content) => {

    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/post/edit/${postId}`,{content},{ withCredentials: true}  )

    return response.data
}


export const getMyThoughts = async (page = 1, limit = 18) => {
    
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/post/my-thoughts?page=${page}&limit=${limit}`,
        {
            withCredentials: true
        }
    )
    
    return response.data
}

export const getFeedPosts = async (page = 1, limit = 18) => {

    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/post/feed`,
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