import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import ChatContent from "../Components/chats/ChatContent"

function ChatPage() {

    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <Sidebar />

            <main className="h-screen pt-15 ml-[256px] mr-[160px]">

                <ChatContent />

            </main>

        </div>
    )
}

export default ChatPage