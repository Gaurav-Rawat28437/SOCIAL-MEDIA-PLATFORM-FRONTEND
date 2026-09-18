import React, { useEffect, useRef, useState } from "react"
import { followUser, getFollowing, unfollowUser } from "../../services/followService"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { loggedInUserFollowingCount } from "../../Utils/usersSlice"

function FollowingModal({ userId, onClose }) {

    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)

    const loadingMoreRef = useRef(false)
    const modalRef = useRef(null)

    const nav = useNavigate()
    const dispatch=useDispatch()

    const loggedInUser = useSelector(store => store.User?.data)

    useEffect(() => {

        const fetchFollowing = async () => {

            try {

                setLoading(true)

                const response = await getFollowing(userId, 1, 10)

                if (response.success) {
                    setFollowing(response.data || [])
                    setHasMore(response.hasMore)
                    setPage(1)
                }

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        fetchFollowing()

    }, [userId])

    const handleScroll = async () => {

        if (
            loadingMoreRef.current ||
            loadingMore ||
            !hasMore ||
            !modalRef.current
        ) {
            return
        }

        const element = modalRef.current

        if (
            element.scrollTop + element.clientHeight + 10 >=
            element.scrollHeight
        ) {

            try {

                loadingMoreRef.current = true
                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getFollowing(
                    userId,
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

    useEffect(() => {

        const element = modalRef.current

        if (!element) return

        element.addEventListener("scroll", handleScroll)

        return () => {
            element.removeEventListener("scroll", handleScroll)
        }

    }, [page, hasMore, loadingMore])


    const handleFollow = async (targetUserId, isFollowing, username) => {
        try {
            let response

            if (isFollowing) {
                response = await unfollowUser(targetUserId)
            } else {
                response = await followUser(targetUserId)
            }

            if (response.success) {
                setFollowing(prev =>
                    prev.map(item =>
                        item.following._id === targetUserId
                            ? {
                                ...item,
                                isFollowing: !isFollowing
                            }
                            : item
                    )
                )

                if (isFollowing) {
                    dispatch(
                        loggedInUserFollowingCount(
                            loggedInUser.followingCount - 1
                        )
                    )
                } else {
                    dispatch(
                        loggedInUserFollowingCount(
                            loggedInUser.followingCount + 1
                        )
                    )
                }

                toast.success(
                    isFollowing
                        ? `Unfollowed ${username}`
                        : `Following ${username}`
                )
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div
                ref={modalRef}
                className="bg-white w-full max-w-md max-h-[70vh] overflow-y-auto rounded-xl p-5"
            >

                <div className="flex justify-between items-center mb-5 sticky top-0 bg-white py-1">

                    <h2 className="text-xl font-bold text-[#4E220F]">
                        Following
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-[#4E220F]"
                    >
                        ×
                    </button>

                </div>

                {loading ? (

                    <p className="text-center py-5">
                        Loading...
                    </p>

                ) : following.length === 0 ? (

                    <p className="text-center py-5">
                        Not following anyone
                    </p>

                ) : (

                    <div className="flex flex-col gap-4">

                        {following.map((item) => (

                            <div

                                key={item.following._id}
                                className="flex items-center gap-3 cursor-pointer"
                            >

                                <img
                                    onClick={() => {
                                        onClose()
                                        if (loggedInUser._id === item.following._id) {
                                            nav("/profile")
                                        }
                                        else {
                                            nav(`/profile/${item.following._id}`)
                                        }

                                    }}
                                    src={
                                        item.following.displayPicture ||
                                        "/muuv_pfp_dark.svg"
                                    }
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div
                                    onClick={() => {
                                        onClose()
                                        if (loggedInUser._id === item.following._id) {
                                            nav("/profile")
                                        }
                                        else {
                                            nav(`/profile/${item.following._id}`)
                                        }

                                    }}
                                >
                                    <p className="font-semibold text-[#4E220F]">
                                        {item.following.firstName}{" "}
                                        {item.following.lastName}
                                    </p>

                                    <p className="text-sm text-[#8B6F61]">
                                        @{item.following.username}
                                    </p>
                                </div>

                                {item.isFollowing !== null && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleFollow(
                                                item.following._id,
                                                item.isFollowing,
                                                item.following.username
                                            )
                                        }}
                                        className={`ml-auto px-4 py-2 rounded-lg text-sm font-semibold ${item.isFollowing
                                            ? "bg-[#3C2A21] text-white"
                                            : "bg-[#D5CEA3] text-[#1A120B] border border:[#1A120B]"
                                            }`}
                                    >
                                        {item.isFollowing ? "Following" : "Follow"}
                                    </button>
                                )}

                            </div>

                        ))}

                        {loadingMore && (
                            <p className="text-center py-4 text-[#8B6F61]">
                                Loading more following...
                            </p>
                        )}

                        {!hasMore && following.length > 0 && (
                            <p className="text-center py-4 text-[#8B6F61]">
                                No more following
                            </p>
                        )}

                    </div>

                )}

            </div>

        </div>
    )
}

export default FollowingModal