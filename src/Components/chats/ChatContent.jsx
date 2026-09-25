import React, { useEffect, useRef, useState } from "react"
import ChatList from "./ChatList"
import ChatBox from "./ChatBox"
import { useDispatch, useSelector } from "react-redux"
import { addChatUserInRedux, chatListThunk, increaseUnreadCount, moveChatUserToTop } from "../../Utils/ChatSlice"
import { addUserInChatList } from "../../services/chatService"
import { io } from "socket.io-client"




function ChatContent() {

    const { loading, data, error } = useSelector(store => store.userChat)
    const chatUsers = data?.chatList || []

    const loggedInUser = useSelector(store => store.User?.data?._id)

    const [selectedUser, setSelectedUser] = useState(null)

    const dispatch = useDispatch()

    const selectedUserRef = useRef(null)

    const socketRef = useRef(null)

    useEffect(() => {

        if (!loggedInUser) return

        if (!socketRef.current) {
            socketRef.current = io(import.meta.env.VITE_SOCKET_URL)
        }

        socketRef.current.emit("identify", loggedInUser)

        const receiveGlobalListener = ({ sender, receiver,senderUser }) => {

            if (sender === selectedUserRef.current?._id) {
                return
            }

            if(!chatUsers.find(item=>item._id===sender))
            {
                dispatch(addChatUserInRedux(senderUser))
            }
            dispatch(moveChatUserToTop(sender))
            dispatch(increaseUnreadCount(sender))
        }

        socketRef.current.on("receive-global-listener", receiveGlobalListener)

        return () => {
            socketRef.current.off(
                "receive-global-listener",
                receiveGlobalListener
            )
        }

    }, [loggedInUser, dispatch])

    useEffect(() => {
        selectedUserRef.current = selectedUser
    }, [selectedUser])


    useEffect(() => {
        if (!data) {
            dispatch(chatListThunk())
        }
    }, [dispatch, data])



    const addChatUser = async (user) => {
        try {
            const alreadyExists = chatUsers.some(
                item => item._id === user._id
            )

            if (alreadyExists) {
                return
            }

           const response= await addUserInChatList(user._id)

           if(response.success)
           {
               dispatch(addChatUserInRedux(user))
           }

        } catch (error) {
            console.log(error)
        }
    }


    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#D5CEA3]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-[#5A382A]/30 border-t-[#3C2A21] rounded-full animate-spin"></div>

                    <p className="text-sm font-medium text-[#3C2A21]">
                        Loading chats...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex">

            <div className="w-[40%]">
                <ChatList
                    setSelectedUser={setSelectedUser}
                    chatUsers={chatUsers}
                />
            </div>

            <div className="w-[60%]">
                <ChatBox
                    selectedUser={selectedUser}
                    addChatUser={addChatUser}
                    chatUsers={chatUsers}
                    socketRef={socketRef}
                />
            </div>

        </div>
    )
}

export default ChatContent