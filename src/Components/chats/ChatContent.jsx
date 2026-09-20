import React, { useState } from "react"
import ChatList from "./ChatList"
import ChatBox from "./ChatBox"

function ChatContent() {

    const [selectedUser, setSelectedUser] = useState(null)

    return (
        <div className="w-full h-full flex ">

            <div className="w-[40%]">
                <ChatList
                    setSelectedUser={setSelectedUser}
                />
            </div>

            <div className="w-[60%]">
                <ChatBox
                    selectedUser={selectedUser}
                />
            </div>

        </div>
    )
}

export default ChatContent