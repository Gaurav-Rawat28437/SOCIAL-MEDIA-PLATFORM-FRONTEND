import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"

function ChatPage()
{
    return(
        <div className="min-h-screen bg-white">
                    <Navbar />
        
                    <Sidebar />
        
                    <main
                        className="
                            pt-20
                            ml-[336px]
                            mr-5
                            pb-10
                        "
                    >
                        <div className="w-[700px]">
                            chat feature coming soon....
                        </div>
                    </main>
        </div>

        
    )
}

export default ChatPage