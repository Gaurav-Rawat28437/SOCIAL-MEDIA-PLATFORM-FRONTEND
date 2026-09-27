import { CheckCheck, ChevronDown, Smile, Reply, MoreVertical, X } from "lucide-react"
import React from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getChatMessages, markChatMessagesAsSeen } from "../../services/chatService"
import { moveChatUserToTop } from "../../Utils/ChatSlice"



function ChatBox({ selectedUser, addChatUser, chatUsers, socketRef }) {

    const loggedInUser = useSelector(store => store.User?.data)

    const [showScrollButton, setShowScrollButton] = useState(false)
    const [messages, setMessages] = useState([])
    const [messagesLoading, setMessagesLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasPreviousPage, setHasPreviousPage] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [replyMessage, setReplyMessage] = useState(null)
    const dispatch = useDispatch()

    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const isLoadingOlderRef = useRef(false)
    const loadingMoreRef = useRef(false)

    useEffect(() => {

        if (!selectedUser) return

        const handleReceiveMessage = async (data) => {

            if (data.sender !== selectedUser._id) {
                return
            }

            dispatch(moveChatUserToTop(selectedUser._id))

            setMessages(prev => [
                ...prev,
                {
                    _id: data._id,
                    text: data.text,
                    sender: data.sender,
                    receiver: data.receiver,
                    isSeen: true,
                    reply: data.reply,
                    time: new Date(data.createdAt || Date.now()).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    }),
                    delivered: true
                }
            ])

            try {

                await markChatMessagesAsSeen(selectedUser._id)

                socketRef.current.emit("mark-seen", {
                    sender: selectedUser._id,
                    receiver: loggedInUser._id
                })

            } catch (error) {
                console.log(error)
            }

        }

        const handleMessagesSeen = (data) => {

            if (data.sender !== loggedInUser._id) {
                return
            }

            setMessages(prev =>
                prev.map(message => {

                    if (
                        message.sender === loggedInUser._id &&
                        message.receiver === data.receiver
                    ) {
                        return {
                            ...message,
                            isSeen: true
                        }
                    }

                    return message
                })
            )

        }

        socketRef.current.emit("join-room", {
            sender: loggedInUser._id,
            receiver: selectedUser._id
        })

        socketRef.current.on("resv-msg", handleReceiveMessage)
        socketRef.current.on("messages-seen", handleMessagesSeen)

        const markMessagesAsSeen = async () => {
            try {
                await markChatMessagesAsSeen(selectedUser._id)

                socketRef.current.emit("mark-seen", {
                    sender: selectedUser._id,
                    receiver: loggedInUser._id
                })

            } catch (error) {
                console.log(error)
            }
        }

        markMessagesAsSeen()

        return () => {
            socketRef.current.off("resv-msg", handleReceiveMessage)
            socketRef.current.off("messages-seen", handleMessagesSeen)
        }

    }, [selectedUser, loggedInUser._id, socketRef])

    useEffect(() => {

        if (!selectedUser) return

        const getMessages = async () => {

            try {
                setMessagesLoading(true)
                setMessages([])
                setCurrentPage(1)
                setHasPreviousPage(false)
                setShowScrollButton(false)

                const response = await getChatMessages(
                    selectedUser._id,
                    1,
                    20
                )

                if (response.success) {

                    const formattedMessages = response.data.messages.map(item => ({
                        _id: item._id,
                        text: item.text,
                        sender: item.sender,
                        receiver: item.receiver,
                        isSeen: item.isSeen,
                        reply: item.reply,
                        time: new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        }),
                        delivered: true
                    }))

                    setMessages(formattedMessages)
                    setCurrentPage(response.data.currentPage)
                    setHasPreviousPage(response.data.hasPreviousPage)

                    requestAnimationFrame(() => {

                        messagesEndRef.current?.scrollIntoView({
                            behavior: "auto"
                        })

                    })

                }

            } catch (error) {

                console.log(error)

            }
            finally {
                setMessagesLoading(false)
            }

        }

        getMessages()

    }, [selectedUser])

    useEffect(() => {

        if (inputRef.current) {
            inputRef.current.value = ""
            inputRef.current.focus()
        }
        setReplyMessage(null)
        setShowScrollButton(false)

    }, [selectedUser])

    useEffect(() => {

        if (!showScrollButton && !isLoadingOlderRef.current) {

            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            })

        }

    }, [messages])

    const handleMessageScroll = async (e) => {

        const element = e.target

        const isAtBottom =
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight < 50

        setShowScrollButton(!isAtBottom)

        if (
            element.scrollTop <= 20 &&
            hasPreviousPage &&
            !loadingMoreRef.current
        ) {

            const oldScrollHeight = element.scrollHeight

            isLoadingOlderRef.current = true
            loadingMoreRef.current = true
            setLoadingMore(true)

            try {

                const nextPage = currentPage + 1

                const response = await getChatMessages(
                    selectedUser._id,
                    nextPage,
                    20
                )

                if (response.success) {

                    const olderMessages = response.data.messages.map(item => ({
                        _id: item._id,
                        text: item.text,
                        sender: item.sender,
                        receiver: item.receiver,
                        isSeen: item.isSeen,
                        reply: item.reply,
                        time: new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        }),
                        delivered: true
                    }))

                    setMessages(prev => [
                        ...olderMessages,
                        ...prev
                    ])

                    setCurrentPage(response.data.currentPage)
                    setHasPreviousPage(response.data.hasPreviousPage)

                    requestAnimationFrame(() => {

                        element.scrollTop =
                            element.scrollHeight - oldScrollHeight

                    })

                }

            } catch (error) {

                console.log(error)

            } finally {

                isLoadingOlderRef.current = false
                loadingMoreRef.current = false
                setLoadingMore(false)

            }

        }

    }

    const scrollToBottom = () => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        })

        setShowScrollButton(false)

    }

    const sendMessage = async () => {

        const text = inputRef.current.value.trim()

        if (!text) return

        const alreadyExists = chatUsers.some(
            user => user._id === selectedUser._id
        )

        if (!alreadyExists) {
            await addChatUser(selectedUser)
        }

        const newMessage = {
            text,
            sender: loggedInUser._id,
            receiver: selectedUser._id,
            isSeen: false,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
            delivered: true,
            reply: replyMessage ? {
                _id: replyMessage._id,
                text: replyMessage.text,
            } : null
        }

        setMessages(prev => [
            ...prev,
            newMessage
        ])

        socketRef.current.emit("send-msg", {
            text,
            sender: loggedInUser._id,
            receiver: selectedUser._id,
            reply: replyMessage ? {
                _id: replyMessage._id,
                text: replyMessage.text,
            } : null,
            senderUser: {
                _id: loggedInUser._id,
                username: loggedInUser.username,
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                displayPicture: loggedInUser.displayPicture
            }
        })

        dispatch(moveChatUserToTop(selectedUser._id))

        inputRef.current.value = ""
        inputRef.current.style.height = "auto"
        setReplyMessage(null)

        setShowScrollButton(false)

        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            })
        })
    }

    const handleReply = (item) => {
        setReplyMessage(item)

        inputRef.current?.focus()

    }

    return (
        <div className="w-full h-full bg-[#E5E5CB]">

            {selectedUser ? (

                <div className="h-full flex flex-col">

                    <div className="flex items-center gap-3 px-5 py-3 border-b border-[#5A382A]/20">

                        <img
                            src={selectedUser.displayPicture || "/muuv_pfp_dark.svg"}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border border-[#1A120B]"
                        />

                        <div>

                            <p className="font-semibold text-[#1A120B]">
                                {selectedUser.username}
                            </p>

                            <p className="text-xs text-[#5A382A]/70">
                                {selectedUser.firstName} {selectedUser.lastName}
                            </p>

                        </div>

                    </div>

                    <div
                        onScroll={handleMessageScroll}
                        className="relative flex-1 overflow-y-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >

                        {!hasPreviousPage && messages.length > 0 && (
                            <div className="flex flex-col items-center justify-center py-4">

                                <img
                                    src={selectedUser.displayPicture || "/muuv_pfp_dark.svg"}
                                    alt=""
                                    className="w-12 h-12 rounded-full object-cover border border-[#1A120B]"
                                />

                                <p className="mt-2 text-sm font-semibold text-[#1A120B]">
                                    {selectedUser.username}
                                </p>

                            </div>
                        )}

                        {messagesLoading ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="w-7 h-7 border-4 border-[#5A382A]/20 border-t-[#3C2A21] rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <>

                                {loadingMore && (
                                    <div className="text-center text-xs text-[#5A382A]/60 py-2">
                                        Loading...
                                    </div>
                                )}

                                {messages.map((item, index) => (

                                    <div
                                        key={item._id || index}
                                        className={` group flex mb-2 items-center ${item.sender === loggedInUser._id
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        {item.sender === loggedInUser._id && (<div className=" hidden group-hover:flex gap-1">

                                            <button
                                                type="button"
                                                className=" w-6 h-6  flex items-center justify-center hover:bg-[#D5CEA3] text-[#3C2A21]"
                                            >
                                                <Smile size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleReply(item)}
                                                className=" w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#D5CEA3] text-[#3C2A21]"
                                            >
                                                <Reply size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                className=" w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#D5CEA3] text-[#3C2A21]"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                        </div>)}

                                        <div className="text-white px-4 py-2 rounded-xl max-w-[70%] break-words whitespace-pre-wrap bg-[#3C2A21]">

                                            {item.reply && (
                                                <div className="mb-2 bg-[#E5E5CB] rounded-lg px-3 py-2 border-l-4 border-[#D5CEA3]">
                                                    <p className="text-xs font-semibold text-[#1A120B] mb-1">
                                                        Reply
                                                    </p>

                                                    <p className="text-sm text-[#1A120B] truncate">
                                                        {item.reply.text}
                                                    </p>
                                                </div>
                                            )}

                                            <p>{item.text}</p>

                                            <div className="flex items-center justify-end gap-1 mt-1">

                                                <p className="text-[10px] text-white/60">
                                                    {item.time}
                                                </p>

                                                {item.delivered &&
                                                    item.sender === loggedInUser._id && (
                                                        <CheckCheck
                                                            size={13}
                                                            className={item.isSeen ? "text-blue-400" : "text-white/60"}
                                                        />
                                                    )
                                                }

                                            </div>

                                        </div>

                                        {item.sender !== loggedInUser._id && (<div className="hidden group-hover:flex gap-1">

                                            <button
                                                type="button"
                                                className=" w-6 h-6  flex items-center justify-center hover:bg-[#D5CEA3] text-[#3C2A21]"
                                            >
                                                <Smile size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleReply(item)}
                                                className="  w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#D5CEA3] text-[#3C2A21]"
                                            >
                                                <Reply size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                className=" w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#D5CEA3] text-[#3C2A21]"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                        </div>)}

                                    </div>

                                ))}

                            </>
                        )}



                        <div ref={messagesEndRef}></div>

                        {showScrollButton && (
                            <button
                                type="button"
                                onClick={scrollToBottom}
                                className="sticky bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1A120B]/40 text-white flex items-center justify-center shadow-lg cursor-pointer z-10"
                            >
                                <ChevronDown size={18} />
                            </button>
                        )}

                    </div>

                    {replyMessage && (
                        <div className="px-5 py-2 border-t border-[#5A382A]/20 bg-transparent flex items-center gap-3">

                            <div className="flex-1 min-w-0 border-l-4 border-[#3C2A21] pl-3">
                                <p className="text-xs font-semibold text-[#3C2A21]">
                                    {replyMessage.sender === loggedInUser._id
                                        ? "You"
                                        : selectedUser.username
                                    }
                                </p>

                                <p className="text-sm text-[#5A382A] truncate max-w-[500px]">
                                    {replyMessage.text}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setReplyMessage(null)}
                                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#D5CEA3] text-[#3C2A21]"
                            >
                                <X size={18} />
                            </button>

                        </div>
                    )}

                    <div className="flex items-center gap-3 px-5 py-3 border-t border-[#5A382A]/20">

                        <textarea
                            ref={inputRef}
                            rows={1}
                            onInput={(e) => {
                                e.target.style.height = "auto"
                                e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    sendMessage()
                                }
                            }}
                            placeholder="Type a message..."
                            className="flex-1 resize-none bg-[#FFFAF3] border border-[#5A382A]/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1A120B] max-h-32 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        />

                        <button
                            type="button"
                            onClick={sendMessage}
                            className="px-4 py-2.5 bg-[#1A120B] text-white rounded-xl text-sm cursor-pointer"
                        >
                            Send
                        </button>

                    </div>

                </div>

            ) : (

                <div className="w-full h-full flex flex-col items-center justify-center text-[#5A382A]/60">

                    <img
                        src="/muuv_pfp_dark.svg"
                        alt=""
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#1A120B]"
                    />

                    <p className="mt-4 text-sm text-[#5A382A]">
                        Select a person to start chatting
                    </p>

                </div>

            )}

        </div>
    )
}

export default ChatBox