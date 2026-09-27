import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getNotifications = async (page = 1, limit = 10) => {
    const response = await axios.get(
        `${API_URL}/notification`,
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

export const markNotificationsAsRead = async () => {
    const response = await axios.patch(
        `${API_URL}/notification/read`,
        {},
        {
            withCredentials: true
        }
    )

    return response.data
}

export const getUnreadNotificationCount = async () => {
    const response = await axios.get(
        `${API_URL}/notification/unread-count`,
        {
            withCredentials: true
        }
    )

    return response.data
}
