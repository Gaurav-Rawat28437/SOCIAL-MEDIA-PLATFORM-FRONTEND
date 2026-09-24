import React, { useEffect, useRef, useState } from "react"
import { Plus, Search, X } from "lucide-react"
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

    const [users, setUsers] =
        useState([])


    const [searchResults, setSearchResults] =
        useState([])

    const [search, setSearch] =
        useState("")

    const [searching, setSearching] =
        useState(false)

    const [loading, setLoading] =
        useState(false)

    const [page, setPage] =
        useState(1)

    const [hasMore, setHasMore] =
        useState(false)

    const [loadingMore, setLoadingMore] =
        useState(false)

    const loadingMoreRef =
        useRef(false)

    const id =
        useRef(null)

    const navigate =
        useNavigate()

    const searchContainerRef = useRef(null)
    const [showUsers, setShowUsers] = useState(false)

    useEffect(() => {

        const handleClick = (e) => {

            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(e.target)
            ) {
                clearTimeout(id.current)

                setSearch("")
                setSearchResults([])
                setSearching(false)
                setShowUsers(false)
            }

        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }

    }, [])

    const getAllUsers = async (pageNumber = 1) => {

        try {

            if (pageNumber === 1) {
                setLoading(true)
            } else {
                setLoadingMore(true)
            }

            const response =
                await getUsersBySearch(
                    "",
                    pageNumber,
                    10
                )

            if (response.success) {

                if (pageNumber === 1) {

                    setUsers(
                        response.users || []
                    )

                } else {

                    setUsers(prev => [
                        ...prev,
                        ...(response.users || [])
                    ])

                }

                setPage(pageNumber)

                setHasMore(
                    response.hasMore
                )

            }

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)
            setLoadingMore(false)

            loadingMoreRef.current =
                false
        }
    }

    const debouncing = (e) => {

        try {

            const input =
                e.target.value

            setSearch(input)

            clearTimeout(id.current)

            const value =
                input.trim().toLowerCase()

            setSearchResults([])

            if (!value) {

                setSearching(false)

                return
            }

            const result =
                users.filter((item) =>
                    item.username?.toLowerCase().includes(value) ||
                    item.firstName?.toLowerCase().includes(value) ||
                    item.lastName?.toLowerCase().includes(value)
                )

            if (result.length > 0) {

                setSearching(false)

                setSearchResults(result)

                return
            }

            setSearching(true)

            id.current =
                setTimeout(async () => {

                    try {

                        const response =
                            await getUsersBySearch(
                                value,
                                1,
                                20
                            )

                        if (response.success) {

                            setSearchResults(
                                response.users || []
                            )

                        }

                    } catch (error) {

                        console.log(error)

                    } finally {

                        setSearching(false)

                    }

                }, 500)

        } catch (error) {

            console.log(error)

            setSearching(false)

        }
    }

    const handleScroll = async (e) => {

        if (
            search ||
            loadingMoreRef.current ||
            !hasMore
        ) {
            return
        }

        const element =
            e.target

        const scrollTop =
            element.scrollTop

        const clientHeight =
            element.clientHeight

        const scrollHeight =
            element.scrollHeight

        if (
            clientHeight +
            scrollTop +
            1 >=
            scrollHeight
        ) {

            try {

                loadingMoreRef.current =
                    true

                setLoadingMore(true)

                const nextPage =
                    page + 1

                const response =
                    await getUsersBySearch(
                        "",
                        nextPage,
                        10
                    )

                if (response.success) {

                    setUsers(prev => [
                        ...prev,
                        ...(response.users || [])
                    ])

                    setHasMore(
                        response.hasMore
                    )

                    setPage(
                        nextPage
                    )

                }

            } catch (error) {

                console.log(error)

            } finally {

                loadingMoreRef.current =
                    false

                setLoadingMore(false)

            }
        }
    }

    const selectUser = (user) => {

    clearTimeout(id.current)

    setSearch("")
    setSearchResults([])
    setShowUsers(false)

    navigate(
        `/profile/${user._id}`
    )
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

            <div
                ref={searchContainerRef}
                className="absolute left-1/2 -translate-x-1/2">

                <div className="relative w-[420px]">

                    <Search
                        size={18}
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                        "
                    />

                    <input
                        onFocus={() => {

                            setShowUsers(true)

                            if (users.length === 0) {
                                getAllUsers(1)
                            }

                        }}
                        onChange={(e) =>
                            debouncing(e)
                        }
                        value={search}
                        type="text"
                        placeholder="Search"
                        className="
                            w-full
                            bg-[#E5E5CB]
                            border
                            border-[#E5E5CB]
                            rounded-full
                            pl-10
                            pr-10
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

                {search && (
                    <button
                        type="button"
                        onClick={() => {
                            clearTimeout(id.current)
                            setSearch("")
                            setSearchResults([])
                            setSearching(false)
                            setShowUsers(false)
                        }}
                        className="
                              absolute
                              right-3
                              top-1/2
                              -translate-y-1/2
                              text-[#3C2A21]
                              hover:text-[#8D493A]
                          "
                    >
                        <X size={18} />
                    </button>
                )}

                {loading && !search && (

                    <div className="
                        absolute
                        top-12
                        left-0
                        w-[420px]
                        bg-[#E5E5CB]
                        rounded-2xl
                        shadow-xl
                        border
                        border-[#D5CEA3]
                        px-4
                        py-5
                        text-center
                        text-[#3C2A21]
                    ">
                        Loading...
                    </div>

                )}

                {searching && (

                    <div className="
                        absolute
                        top-12
                        left-0
                        w-[420px]
                        bg-[#E5E5CB]
                        rounded-2xl
                        shadow-xl
                        border
                        border-[#D5CEA3]
                        px-4
                        py-5
                        text-center
                        text-[#3C2A21]
                    ">
                        Searching...
                    </div>

                )}

                {!searching &&
                    search &&
                    searchResults.length > 0 && (

                        <div
                            className="
                                absolute
                                top-12
                                left-0
                                w-[420px]
                                bg-[#E5E5CB]
                                rounded-2xl
                                shadow-xl
                                border
                                border-[#D5CEA3]
                                overflow-hidden
                            "
                        >

                            {searchResults.map((item) => (

                                <div
                                    onClick={() =>
                                        selectUser(item)
                                    }
                                    key={item._id}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        hover:bg-[#D5CEA3]
                                        cursor-pointer
                                    "
                                >

                                    <div className="
                                        w-11
                                        h-11
                                        rounded-full
                                        overflow-hidden
                                        bg-[#D0B8A8]
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        {item.displayPicture ? (

                                            <img
                                                src={item.displayPicture}
                                                alt="userPfp"
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                "
                                            />

                                        ) : (

                                            <span className="
                                                text-[#3C2A21]
                                                font-semibold
                                            ">
                                                {item.firstName?.[0]?.toUpperCase() || "U"}
                                            </span>

                                        )}

                                    </div>

                                    <div>

                                        <p className="
                                            font-semibold
                                            text-[#3C2A21]
                                        ">
                                            {item.firstName} {item.lastName}
                                        </p>

                                        <p className="
                                            text-sm
                                            text-[#8D493A]
                                        ">
                                            @{item.username}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                {!searching &&
                    search &&
                    searchResults.length === 0 && (

                        <div className="
                            absolute
                            top-12
                            left-0
                            w-[420px]
                            bg-[#E5E5CB]
                            rounded-2xl
                            shadow-xl
                            border
                            border-[#D5CEA3]
                            px-4
                            py-5
                            text-center
                            text-[#3C2A21]
                        ">
                            User not found
                        </div>

                    )}

                {showUsers && !search && users.length > 0 && (

                    <div
                        onScroll={handleScroll}
                        className="
                            absolute
                            top-12
                            left-0
                            w-[420px]
                            bg-[#E5E5CB]
                            rounded-2xl
                            shadow-xl
                            border
                            border-[#D5CEA3]
                            overflow-y-auto
                            max-h-80
                            [scrollbar-width:none]
                            [&::-webkit-scrollbar]:hidden
                        "
                    >

                        {users.map((item) => (

                            <div
                                onClick={() =>
                                    selectUser(item)
                                }
                                key={item._id}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    hover:bg-[#D5CEA3]
                                    cursor-pointer
                                "
                            >

                                <div className="
                                    w-11
                                    h-11
                                    rounded-full
                                    overflow-hidden
                                    bg-[#D0B8A8]
                                    flex
                                    items-center
                                    justify-center
                                ">

                                    {item.displayPicture ? (

                                        <img
                                            src={item.displayPicture}
                                            alt="userPfp"
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <span className="
                                            text-[#3C2A21]
                                            font-semibold
                                        ">
                                            {item.firstName?.[0]?.toUpperCase() || "U"}
                                        </span>

                                    )}

                                </div>

                                <div>

                                    <p className="
                                        font-semibold
                                        text-[#3C2A21]
                                    ">
                                        {item.firstName} {item.lastName}
                                    </p>

                                    <p className="
                                        text-sm
                                        text-[#8D493A]
                                    ">
                                        @{item.username}
                                    </p>

                                </div>

                            </div>

                        ))}

                        {loadingMore && (

                            <div className="
                                text-center
                                py-3
                                text-sm
                                text-[#3C2A21]
                            ">
                                Loading more...
                            </div>

                        )}

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
                        transition
                        scale-105
                    "
                >

                    <Plus size={18} />

                    <span>
                        Post
                    </span>

                </button>

                <div className="
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
                ">

                    {userData?.displayPicture ? (

                        <img
                            src={userData.displayPicture}
                            alt="Profile"
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />

                    ) : (

                        <span>
                            {userData?.firstName?.[0]?.toUpperCase() || "U"}
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