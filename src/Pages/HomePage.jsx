import React from "react"
import Navbar from "../Components/common/Navbar"
import Sidebar from "../Components/common/Sidebar"
import HomeContent from "../Components/home/HomeContent"

function HomePage() {
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
                    <HomeContent />
                </div>
            </main>
        </div>
    )
}

export default HomePage