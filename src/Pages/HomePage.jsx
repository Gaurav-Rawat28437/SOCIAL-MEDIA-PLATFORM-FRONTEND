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
                    ml-0
                    lg:ml-[336px]
                    mr-0
                    lg:mr-5
                    pb-24
                    lg:pb-10
                    px-3
                    sm:px-5
                "
            >
                <div className="w-full max-w-[700px] mx-auto lg:mx-0">
                    <HomeContent />
                </div>
            </main>
        </div>
    )
}

export default HomePage