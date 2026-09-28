import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import ProfileContent from "../Components/profile/ProfileContent"

function ProfilePage() {

    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <Sidebar />

            <main className="pt-16 ml-0 md:ml-20 pb-16 lg:pb-0 px-3 md:px-6 lg:px-8">

                <ProfileContent />

            </main>

        </div>
    )
}

export default ProfilePage