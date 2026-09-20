import React from "react"

function ChatBox({ selectedUser }) {

    return (
        <div className="w-full h-full">

            {selectedUser ? (
                <div>
                    {selectedUser.username}
                </div>
            ) : (
                <div>
                    Select a person to start chatting
                </div>
            )}

        </div>
    )
}

export default ChatBox