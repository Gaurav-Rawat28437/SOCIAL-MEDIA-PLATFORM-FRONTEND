import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import ProfileContent from "../Components/profile/ProfileContent"

function ProfilePage() {

  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <Sidebar />

      <main className="pt-16 ml-20">

        <ProfileContent />

      </main>

    </div>
  )
}

export default ProfilePage