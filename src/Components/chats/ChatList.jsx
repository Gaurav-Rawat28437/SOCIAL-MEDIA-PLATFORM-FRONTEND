import { Search, X } from "lucide-react"
import React, { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { getFollowing } from "../../services/followService"
import { useDispatch, useSelector } from "react-redux"
import SearchModal from "./SearchModal"
import { getUsersBySearch } from "../../services/otherUserService"
import { clearUnreadCount } from "../../Utils/ChatSlice"

function ChatList({ setSelectedUser, chatUsers }) {

    const userData = useSelector((store) => store.User.data)

    const [showFollowing, setShowFollowing] = useState(false)
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const dispatch=useDispatch()

    const loadingMoreRef = useRef(false)
    const timer = useRef(null)
    const [search, setSearch] = useState("")

    const [searchResults, setSearchResults] = useState([])
    const [searchLoading, setSearchLoading] = useState(false)

    const searchContainerRef = useRef(null)


    useEffect(() => {

        const handleClick = (e) => {

            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(e.target)
            ) {

                clearTimeout(timer.current)

                setSearch("")
                setSearchResults([])
                setSearchLoading(false)
                setShowFollowing(false)

            }

        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }

    }, [])

    const debouncing = (input) => {

        clearTimeout(timer.current)

        const value = input.trim().toLowerCase()

        setSearchResults([])

        if (!value) {
            setSearchLoading(false)
            return
        }

        if (following?.length > 0) {

            const result = following.filter((item) =>
                item.following?.username?.toLowerCase().includes(value) ||
                item.following?.firstName?.toLowerCase().includes(value) ||
                item.following?.lastName?.toLowerCase().includes(value)
            )

            if (result?.length > 0) {

                setSearchLoading(false)
                setSearchResults(result.map((item) => item.following))

                return
            }
        }

        setSearchLoading(true)

        timer.current = setTimeout(async () => {

            try {

                const response = await getUsersBySearch(value)

                if (response.success) {
                    setSearchResults(response.users || [])
                }

            } catch (error) {

                console.log(error)

            } finally {

                setSearchLoading(false)

            }

        }, 3000)
    }

    const getFollowingList = async () => {

        try {

            setLoading(true)

            const response = await getFollowing(
                userData._id,
                1,
                10
            )

            setFollowing(response.data || [])
            setPage(1)
            setHasMore(response.hasMore)

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)

        }
    }

    const handleScroll = async (e) => {

        if (search || loadingMoreRef.current || !hasMore) return

        const element = e.target

        const scrollTop = element.scrollTop
        const clientHeight = element.clientHeight
        const scrollHeight = element.scrollHeight

        if (clientHeight + scrollTop + 1 >= scrollHeight) {

            try {

                loadingMoreRef.current = true
                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getFollowing(
                    userData._id,
                    nextPage,
                    10
                )

                if (response.success) {

                    setFollowing(prev => [
                        ...prev,
                        ...(response.data || [])
                    ])

                    setHasMore(response.hasMore)
                    setPage(nextPage)

                }

            } catch (error) {

                console.log(error)

            } finally {

                loadingMoreRef.current = false
                setLoadingMore(false)

            }

        }

    }

    return (
        <div className="w-full h-full bg-[#D5CEA3] flex flex-col">

            <div className="px-5 py-2">

                <h3 className="font-semibold text-[#1A120B] text-lg">
                    Chats
                </h3>

            </div>

            <div
                ref={searchContainerRef}
                className="px-5 relative">

                <div className="flex items-center gap-2 bg-[#E5E5CB] border border-[#5A382A]/30 rounded-xl px-3 py-2.5 focus-within:border-[#1A120B] transition">

                    <Search
                        size={18}
                        className="text-[#5A382A] shrink-0"
                    />

                    <input
                        onFocus={() => {
                            setShowFollowing(true)
                            getFollowingList()
                        }}
                        onChange={(e) => {
                            const input = e.target.value

                            setSearch(input)
                            debouncing(input)
                        }}
                        type="text"
                        value={search}
                        placeholder="Search people..."
                        className="w-full bg-transparent text-sm text-[#1A120B] placeholder:text-[#5A382A]/50 outline-none"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                clearTimeout(timer.current)
                                setSearch("")
                                setSearchResults([])
                                setSearchLoading(false)
                            }}
                            className="text-[#5A382A] hover:text-[#1A120B]"
                        >
                            <X size={18} />
                        </button>
                    )}

                </div>

                {showFollowing && (
                    <SearchModal
                        following={following}
                        searchResults={searchResults}
                        search={search}
                        setSearch={setSearch}
                        loading={loading}
                        searchLoading={searchLoading}
                        loadingMore={loadingMore}
                        onScroll={handleScroll}
                        onSelect={(user) => {
                            setSelectedUser(user)
                            setSearch("")
                            setSearchResults([])
                            setShowFollowing(false)
                        }}
                        onClose={() => {
                            setSearch("")
                            setSearchResults([])
                            setShowFollowing(false)
                        }}
                    />
                )}

            </div>

            <div className="flex-1 overflow-y-auto px-3 mt-2">

                {chatUsers?.length > 0 ? (

                    chatUsers.map((user) => (

                        <div
                            key={user._id}
                            onClick={() => {
                                setSelectedUser(user)
                                dispatch(clearUnreadCount(user._id))
                            }}
                            className="flex items-center gap-3 px-2 py-3 mt-1 bg-[#3C2A21] border-[#E5E5CB] hover:bg-[#3C2A21]/90 rounded-2xl cursor-pointer"
                        >

                            <img
                                src={user.displayPicture || "/muuv_pfp_dark.svg"}
                                alt=""
                                className="w-11 h-11 rounded-full object-cover"
                            />

                            <div className="flex-1 min-w-0">

                                <p className="font-semibold text-sm text-[#E5E5CB] truncate">
                                    {user.username}
                                </p>

                                <p className="text-xs text-[#D5CEA3] truncate">
                                    {user.firstName} {user.lastName}
                                </p>

                            </div>

                            {user.unreadCount > 0 && (
                                <div className="min-w-5 h-5 mx-3 rounded-full bg-[#E5E5CB] text-[#1A120B] text-xs flex items-center justify-center">
                                    {user.unreadCount}
                                </div>
                            )}

                        </div>

                    ))

                ) : (

                    <div className="px-2 py-5 text-sm text-[#1A120B]/60">
                        No chats yet
                    </div>

                )}

            </div>

        </div>
    )
}

export default ChatList