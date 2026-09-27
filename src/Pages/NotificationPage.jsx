import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import NotificationContent from "../Components/notifications/NotificationContent"

function NotificationPage() {
    return (
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
                    <NotificationContent />
                </div>
            </main>
        </div>
    )
}

export default NotificationPage