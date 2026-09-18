import React, { useRef, useState } from "react"
import { Plus, Search } from "lucide-react"
import { useSelector } from "react-redux"
import CreatePostModal from "../post/CreatePostModal"
import { getUsersBySearch } from "../../services/otherUserService"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const userData = useSelector(
        store => store.User?.data
    )

    const [showCreatePost, setShowCreatePost] =
        useState(false)

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searching, setSearching] = useState(false)

    const navigate=useNavigate()

    const id = useRef(null)

    const debouncing = (e) => {
        try {
            const value = e.target.value

            setSearch(value)
            clearTimeout(id.current)

            if (value === "") {
                setUsers([])
                setSearching(false)
                return
            }

            setSearching(true)

            id.current = setTimeout(async () => {
                const response = await getUsersBySearch(value)

                setUsers(response.users || [])
                setSearching(false)
            }, 500)
        } catch (error) {
            console.log(error)
            setSearching(false)
        }
    }


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
                <img
                    src="/MUUV_logo2.png"
                    alt="MUUV-logo"
                    className="h-12 w-auto object-contain"
                />

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
                        onChange={(e) => debouncing(e)}
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

                {searching && (
                    <div className="absolute top-12 left-0 w-[420px] bg-[#E5E5CB] rounded-2xl shadow-xl border border-[#D5CEA3] px-4 py-5 text-center text-[#3C2A21]">
                        Searching...
                    </div>
                )}

                {!searching && users.length > 0 && (
                    <div className="absolute top-12 left-0 w-[420px] bg-[#E5E5CB] rounded-2xl shadow-xl border border-[#D5CEA3] overflow-hidden">
                        {users.map((item) => (
                            <div
                                onClick={() => {
                                    navigate(`/profile/${item._id}`)}}
                                key={item._id}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[#D5CEA3] cursor-pointer"
                            >
                                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#D0B8A8] flex items-center justify-center">
                                    {item.displayPicture ? (
                                        <img
                                            src={item.displayPicture}
                                            alt="userPfp"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[#3C2A21] font-semibold">
                                            {item.firstName?.[0]?.toUpperCase() || "U"}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <p className="font-semibold text-[#3C2A21]">
                                        {item.firstName} {item.lastName}
                                    </p>

                                    <p className="text-sm text-[#8D493A]">
                                        @{item.username}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!searching && search && users.length === 0 && (
                    <div className="absolute top-12 left-0 w-[420px] bg-[#E5E5CB] rounded-2xl shadow-xl border border-[#D5CEA3] px-4 py-5 text-center text-[#3C2A21]">
                        User not found
                    </div>
                )}

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