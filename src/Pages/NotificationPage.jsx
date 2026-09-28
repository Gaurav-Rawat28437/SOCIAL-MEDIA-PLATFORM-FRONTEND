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
                    ml-0
                    md:ml-20
                    lg:ml-[336px]
                    mr-0
                    md:mr-5
                    pb-20
                    lg:pb-10
                    px-3
                    md:px-0
                "
            >
                <div className="w-full max-w-[700px]">
                    <NotificationContent />
                </div>
            </main>
        </div>
    )
}

export default NotificationPage