import React, { useState } from "react"
import { Plus, Search } from "lucide-react"
import { useSelector } from "react-redux"
import CreatePostModal from "../post/CreatePostModal"

function Navbar() {
    const userData = useSelector(
        store => store.User?.data
    )

    const [showCreatePost, setShowCreatePost] =
        useState(false)

    return (
        <nav
            className="
                fixed
                top-0
                left-0
                right-0
                z-50
                h-16
                bg-[#3C2A21]
                border-b
                border-[#D5CEA3]
                flex
                items-center
                px-6
                shadow-[0_2px_10px_rgba(141,73,58,0.08)]
            "
        >
            <div className="flex items-center gap-3">
                {/* <img
                    src="/MUUV_logo2.png"
                    alt="MUUV-logo"
                    className="h-12 w-auto object-contain"
                /> */}

                <div className="hidden sm:block">
                    <h1 className="text-2xl font-extrabold tracking-tight text-[#E5E5CB]">
                        MUUV
                    </h1>

                    <p className="text-[10px] leading-none text-[#D5CEA3]">
                        your move, your feed
                    </p>
                </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
                <div className="relative w-[420px]">
                    <Search
                        id="search"
                        size={18}
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                        "
                    />

                    <input
                        id="search"
                        type="text"
                        placeholder="Search"
                        className="
                            w-full
                            bg-[#E5E5CB]
                            border
                            border-[#E5E5CB]
                            rounded-full
                            pl-10
                            pr-4
                            py-2
                            text-sm
                            outline-none
                            focus:bg-[#E5E5CB]
                            focus:border-[#E5E5CB]
                            focus:ring-2
                            focus:ring-[#1A120B]
                            transition
                        "
                    />
                </div>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <button
                    type="button"
                    onClick={() =>
                        setShowCreatePost(true)
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        px-5
                        py-2
                        rounded-full
                        bg-[#E5E5CB]
                        text-[#1A120B]
                        font-semibold
                        border
                        border-[#D5CEA3]
                        hover:bg-[#D5CEA3]
                        hover:border-[#E5E5CB]
                        transition scale-105
                    "
                >
                    <Plus size={18} />
                    <span>Post</span>
                </button>

                <div
                    className="
                        w-10
                        h-10
                        rounded-full
                        overflow-hidden
                        bg-[#D0B8A8]
                        border
                        border-[#E5E5CB]
                        flex
                        items-center
                        justify-center
                        text-[#8D493A]
                        font-semibold
                    "
                >
                    {userData?.displayPicture ? (
                        <img
                            src={userData.displayPicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>
                            {userData?.firstName?.[0]?.toUpperCase() ||
                                "U"}
                        </span>
                    )}
                </div>
            </div>

            {showCreatePost && (
                <CreatePostModal
                    setShowCreatePost={
                        setShowCreatePost
                    }
                />
            )}
        </nav>
    )
}

export default Navbar