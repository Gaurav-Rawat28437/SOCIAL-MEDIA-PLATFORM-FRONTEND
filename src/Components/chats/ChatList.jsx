import { Search } from "lucide-react"
import React from "react"
import { useState } from "react"
import { useRef } from "react"
import { getFollowing } from "../../services/followService"
import { useSelector } from "react-redux"
import SearchModal from "./SearchModal"
import { getUsersBySearch } from "../../services/otherUserService"

function ChatList({ setSelectedUser }) {

    const userData = useSelector((store) => store.User.data)

    const [showFollowing, setShowFollowing] = useState(false)
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const loadingMoreRef = useRef(false)
    const timer = useRef(null)
    const [search, setSearch] = useState("")

    const [searchResults, setSearchResults] = useState([])

    const debouncing = (input) => {
        console.log("ok")

    clearTimeout(timer.current)

    const value = input.trim().toLowerCase()

    setSearchResults([])

    if (!value) {
        return
    }

    timer.current = setTimeout(async () => {

        const result = following.filter((item) =>
            item.following.username.toLowerCase().includes(value) ||
            item.following.firstName.toLowerCase().includes(value) ||
            item.following.lastName.toLowerCase().includes(value)
        )

        if (result.length > 0) {

            setSearchResults(result)

            return

        }

        try {

            const response = await getUsersBySearch(value)

            if (response.success) {
                setSearchResults(response.users || [])
            }
            console.log(following)
console.log(value)
console.log(result)

        } catch (error) {

            console.log(error)

        }

    }, 500)

}

    const getFollowingList = async () => {

        try {

            setLoading(true)

            const response = await getFollowing(
                userData._id,
                1,
                10
            )

            setFollowing(response.data)
            setPage(1)
            setHasMore(response.hasMore)
            setShowFollowing(true)

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

            <div className="px-5 relative">

                <div className="flex items-center gap-2 bg-[#E5E5CB] border border-[#5A382A]/30 rounded-xl px-3 py-2.5 focus-within:border-[#1A120B] transition">

                    <Search
                        size={18}
                        className="text-[#5A382A] shrink-0"
                    />

                    <input
                        onFocus={() => {
                            getFollowingList()
                        }}
                        onChange={(e) => {
                            const input = e.target.value

                            setSearch(input)
                            debouncing(input)

                        }}
                        type="text"
                        placeholder="Search people..."
                        className="w-full bg-transparent text-sm text-[#1A120B] placeholder:text-[#5A382A]/50 outline-none"
                    />

                </div>

                {showFollowing && (
                    <SearchModal
                        following={following}
                        searchResults={searchResults}
                        search={search}
                        loading={loading}
                        loadingMore={loadingMore}
                        onScroll={handleScroll}
                        onSelect={(user) => {
                            setSelectedUser(user)
                            setShowFollowing(false)
                        }}
                        onClose={() => {
                            setShowFollowing(false)
                        }}
                    />
                )}

            </div>



            <div className="flex-1 overflow-y-auto px-3">

                <div className="px-2 py-3 text-sm border-t mt-2 text-[#1A120B]/60">
                    chatList
                </div>

            </div>

        </div>
    )
}

export default ChatList