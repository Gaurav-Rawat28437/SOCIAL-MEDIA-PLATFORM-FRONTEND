import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import socket from "../../socket.io/socket"
import {
    addNotification,
    addNotifications,
    clearUnreadNotificationCount,
    decreaseUnreadNotification,
    setHasMore,
    setNotifications
} from "../../Utils/notificationSlice"
import {
    getNotifications,
    markNotificationsAsRead
} from "../../services/notificationService"
import NotificationCard from "./NotificationCard"

function NotificationContent() {

    const notifications = useSelector(
        store => store.notification?.notifications || []
    )

    const hasMore = useSelector(
        store => store.notification?.hasMore
    )

    const dispatch = useDispatch()
    const socketRef = useRef(null)

    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (!socketRef.current) {
            socketRef.current = socket
        }

        const receiveNotification = ({ notificationData }) => {

            dispatch(
                addNotification({
                    ...notificationData,
                    isRead: true
                })
            )

            dispatch(decreaseUnreadNotification())
        }

        socketRef.current.on(
            "receive-notification",
            receiveNotification
        )

        return () => {
            socketRef.current.off(
                "receive-notification",
                receiveNotification
            )
        }

    }, [dispatch])

    useEffect(() => {

        const getNotificationData = async () => {

            try {

                setLoading(true)

                const readResponse = await markNotificationsAsRead()

                if (readResponse?.success) {
                    dispatch(clearUnreadNotificationCount())
                }

                const response = await getNotifications(1, 10)

                if (response?.success) {
                    dispatch(setNotifications(response.data))
                    dispatch(setHasMore(response.hasMore))
                    setPage(1)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }

        getNotificationData()

    }, [dispatch])

    const handleLoadMore = async () => {

        if (loading || !hasMore) {
            return
        }

        try {

            setLoading(true)

            const nextPage = page + 1

            const response = await getNotifications(
                nextPage,
                10
            )

            if (response?.success) {
                dispatch(addNotifications(response.data))
                dispatch(setHasMore(response.hasMore))
                setPage(nextPage)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">

            <h1 className="text-2xl font-semibold text-[#3C2A21] mb-6">
                Notifications
            </h1>

            {loading && notifications.length === 0 ? (

                <div className="flex flex-col gap-4">

                    {[1, 2, 3].map(item => (
                        <div
                            key={item}
                            className="
                                bg-[#D5CEA3]
                                rounded-2xl
                                border
                                border-[#FFE5BF]
                                p-4
                                flex
                                items-center
                                gap-4
                                animate-pulse
                            "
                        >

                            <div className="w-12 h-12 rounded-full bg-[#FFE5BF] shrink-0" />

                            <div className="flex-1 space-y-2">

                                <div className="h-4 w-40 bg-[#FFE5BF] rounded" />

                                <div className="h-3 w-56 bg-[#FFE5BF] rounded" />

                                <div className="h-3 w-24 bg-[#FFE5BF] rounded" />

                            </div>

                            <div className="w-20 h-14 bg-[#FFE5BF] rounded-lg shrink-0" />

                        </div>
                    ))}

                </div>

            ) : notifications.length === 0 ? (

                <div
                    className="
                        bg-[#D5CEA3]
                        rounded-2xl
                        border
                        border-[#3C2A21]
                        py-12
                        text-center
                        text-[#1A120B]
                        shadow-[0_3px_12px_rgba(141,73,58,0.07)]
                    "
                >
                    No notifications yet
                </div>

            ) : (

                <div className="flex flex-col gap-4">

                    {notifications.map(notification => (
                        <NotificationCard
                            key={notification._id}
                            notification={notification}
                        />
                    ))}

                    {hasMore && (
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            disabled={loading}
                            className="
                                self-center
                                px-5
                                py-2
                                rounded-full
                                bg-[#4E220F]
                                text-[#F8EDE3]
                                text-sm
                                hover:bg-[#3C2A21]
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    )}

                </div>

            )}

        </div>
    )
}

export default NotificationContent