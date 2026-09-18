import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import OtherUserProfileContent from "../Components/profile/OtherUserProfileContent"

function OtherUserProfilePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <Sidebar />

            <main className="pt-16 ml-20">
                <OtherUserProfileContent />
            </main>
        </div>
    )
}

export default OtherUserProfilePage