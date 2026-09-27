import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Components/common/Loading'
import { addUserData } from '../Utils/usersSlice'
import socket from '../socket.io/socket'
import { increaseTotalUnreadMessages, setTotalUnreadMessages } from '../Utils/globalDataSlice'
import { getUnreadMessageCount } from '../services/chatService'
import { increaseUnreadNotification, setUnreadNotificationCount } from '../Utils/notificationSlice'
import { getUnreadNotificationCount } from '../services/notificationService'
import { updateFeedPostComments, updateFeedPostLikeCount } from '../Utils/feedSlice'
import { updateThoughtComments, updateThoughtLikeCount } from '../Utils/thoughtsSlice'
import { updateReplyLikeCount } from '../Utils/myRepliesSlice'
import { updatePostComments, updatePostLikeCount } from '../Utils/postsSlice'
import { updateLikeComments, updateLikeCount } from '../Utils/myLikesSlice'



function ProtectedRoutes() {

  const userData = useSelector(store => store.User?.data)
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const socketRef = useRef(null)


  useEffect(() => {

    if (userData?.username) {
      setLoading(false)
      return
    }

    const getData = async () => {

      try {

        const res = await axios.get(import.meta.env.VITE_API_URL + "/auth/get-user-data", { withCredentials: true })

        if (res.data.success) {
          dispatch(addUserData(res.data.data))
        }

      } catch (error) {

        nav("/login")

      } finally {

        setLoading(false)

      }
    }

    getData()

  }, [userData?.username, dispatch, nav])


  useEffect(() => {

    if (!loading && userData?.username && !userData.isCompletedProfile) {
      nav("/complete-profile")
    }

    if (userData?.isCompletedProfile && location.pathname === "/complete-profile") {
      nav("/home")
    }


  }, [loading, userData?.username, userData?.isCompletedProfile, nav])


  useEffect(() => {
    if (!userData?.username) {
      return
    }
    if (!socketRef.current) {
      socketRef.current = socket
    }
    socketRef.current.emit("identify", userData._id)

    const receiveGlobalListener = ({ sender, receiver, senderUser }) => {
      dispatch(increaseTotalUnreadMessages())
    }

    const receiveLikeUpdate = ({ postId, likesCount }) => {

      dispatch(
        updateFeedPostLikeCount({
          postId,
          likesCount
        })
      )

      dispatch(
        updateThoughtLikeCount({
          postId,
          likesCount
        })
      )

      dispatch(
        updateReplyLikeCount({
          postId,
          likesCount
        })
      )

      dispatch(
        updatePostLikeCount({
          postId,
          likesCount
        })
      )

      dispatch(
        updateLikeCount({
          postId,
          likesCount
        })
      )

    }

    const receiveCommentUpdate = ({ postId, commentsCount }) => {

      dispatch(
        updateFeedPostComments({
          postId,
          commentsCount
        })
      )

      dispatch(
        updateThoughtComments({
          postId,
          commentsCount
        })
      )

      dispatch(
        updatePostComments({
          postId,
          commentsCount
        })
      )

      dispatch(
        updateLikeComments({
          postId,
          commentsCount
        })
      )

    }

    const receiveNotification = ({ notificationData }) => {
      dispatch(increaseUnreadNotification())
    }

    socketRef.current.on("receive-global-listener", receiveGlobalListener)
    socketRef.current.on("receive-notification", receiveNotification)
    socketRef.current.on("receive-like-update", receiveLikeUpdate)
    socketRef.current.on("receive-comment-update",receiveCommentUpdate)



    return () => {
      socketRef.current.off("receive-global-listener", receiveGlobalListener)
      socketRef.current.off("receive-notification", receiveNotification)
      socketRef.current.off("receive-like-update", receiveLikeUpdate)
      socketRef.current.off("receive-comment-update",receiveCommentUpdate)
    }


  }, [userData?.username, dispatch])

  useEffect(() => {
    if (!userData?._id) {
      return
    }

    const getUnreadCount = async () => {
      try {
        const [messageResponse, notificationResponse] = await Promise.all([
          getUnreadMessageCount(),
          getUnreadNotificationCount()
        ])

        if (messageResponse.success) {
          dispatch(setTotalUnreadMessages(messageResponse.unreadCount))
        }

        if (notificationResponse.success) {
          dispatch(setUnreadNotificationCount(notificationResponse.unreadCount))
        }

      } catch (error) {
        console.log(error)
      }
    }

    getUnreadCount()

  }, [userData?._id, dispatch])

  if (loading) {
    return <Loading />
  }

  return <Outlet />
}

export default ProtectedRoutes