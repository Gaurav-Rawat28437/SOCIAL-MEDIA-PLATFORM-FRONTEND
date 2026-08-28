import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import HomeContent from "../Components/home/homeContent"

function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8EDE3]">

      <Navbar />

      <Sidebar />

      <main className="pt-16 ml-20 p-8">

        <HomeContent />

      </main>

    </div>
  )
}

export default HomePage