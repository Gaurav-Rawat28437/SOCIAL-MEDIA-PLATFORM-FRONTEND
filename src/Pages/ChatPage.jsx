import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import ChatContent from "../Components/chats/ChatContent"

function ChatPage() {

    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <Sidebar />

            <main className="h-screen pt-16 ml-0 md:ml-20 lg:ml-[256px] mr-0 lg:mr-[160px] pb-16 lg:pb-0">

                <ChatContent />

            </main>

        </div>
    )
}

export default ChatPage