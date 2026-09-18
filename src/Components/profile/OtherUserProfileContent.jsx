import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Calendar } from "lucide-react"
import { getUserProfile } from "../../services/otherUserService"
import OtherUserPost from "../post/otherUserPost/OtherUserPost"
import OtherUserThought from "../post/otherUserPost/OtherUserThought"
import { followUser, unfollowUser } from "../../services/followService"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { otherFollowersCount, setOtherUser, userIsFollowing } from "../../Utils/otherUserSlice"
import {loggedInUserFollowingCount } from "../../Utils/usersSlice"

function OtherUserProfileContent() {
    const { userId } = useParams()
    const loggedInUser=useSelector(store=>store.User?.data)
    const userData=useSelector(store=>store.otherUser?.data)
    
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("posts")

    const dispatch=useDispatch()

    const [isFollowing, setIsFollowing] = useState(userData?.isFollowing || false)

     const handleFollow = async () => {
    try {
        let response

        if (isFollowing) {
            response = await unfollowUser(userId)
        } else {
            response = await followUser(userId)
        }

        if (response.success) {
            setIsFollowing(!isFollowing)
            dispatch(userIsFollowing(!isFollowing))

            if (isFollowing) {
                toast.success(`Unfollowed ${userData.username}`)
                dispatch(otherFollowersCount(userData.followersCount-1))
                dispatch(loggedInUserFollowingCount(loggedInUser.followingCount-1))
            } else {
                toast.success(`Following ${userData.username}`)
                dispatch(otherFollowersCount(userData.followersCount+1))
                dispatch(loggedInUserFollowingCount(loggedInUser.followingCount+1))
            }
        }
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
}

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)

                const response = await getUserProfile(userId)

                if (response.success) {
                    dispatch(setOtherUser(response.data))
                    setIsFollowing(response?.data?.isFollowing)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [userId,dispatch])

    if (loading) {
        return (
            <div className="text-center py-10 text-[#1A120B]">
                Loading profile...
            </div>
        )
    }

    if (!userData?._id) {
        return (
            <div className="text-center py-10 text-[#1A120B]">
                User not found
            </div>
        )
    }

    const {
        bio,
        createdAt,
        displayPicture,
        firstName,
        coverPicture,
        followersCount,
        followingCount,
        postCount,
        thoughtCount,
        lastName,
        username
    } = userData

    return (
        <div className="max-w-4xl mx-auto">
            <div className="h-48 bg-gradient-to-r from-[#9D6638] to-[#B0BA99]">
                <img
                    src={coverPicture || "/muuv_display_picture.svg"}
                    alt="Cover"
                    className={`w-full h-full ${coverPicture ? "object-cover" : "object-contain"
                        }`}
                />
            </div>

            <div className="px-8 pb-6">
                <div className="flex justify-between items-start">
                    <div className="-mt-14">
                        <img
                            src={displayPicture || "/muuv_pfp_dark.svg"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full bg-[#4E220F] border-4 border-white object-cover"
                        />
                    </div>

                    <button
                        onClick={()=>{
                            handleFollow()
                        }}
                        type="button"
                        className="mt-4 px-5 py-2 rounded-full border-2 border-[#3C2A21] text-[#3C2A21] font-semibold hover:bg-[#3C2A21] hover:border-[#D5CEA3] hover:text-white transition"
                    >
                        {isFollowing ? "Following" : "Follow"}
                    </button>
                </div>

                <div className="mt-3">
                    <h1 className="text-2xl font-bold text-[#4E220F]">
                        {firstName} {lastName}
                    </h1>

                    <p className="text-[#9D6638]">
                        @{username}
                    </p>

                    <p className="mt-3 max-w-xl text-[#4A352C]">
                        {bio || "Welcome to my Muuv profile 👋"}
                    </p>

                    <div className="flex flex-wrap gap-5 mt-4 text-sm text-[#8B6F61]">
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            Joined{" "}
                            {createdAt &&
                                new Date(createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        year: "numeric"
                                    }
                                )
                            }
                        </div>
                    </div>

                    <div className="flex gap-6 mt-4 text-sm">

                        <span className="text-[#8B6F61]">
                            <b className="text-[#4E220F]">
                                {postCount || 0}
                            </b>{" "}
                            Post
                        </span>

                        <span className="text-[#8B6F61]">
                            <b className="text-[#4E220F]">
                                {thoughtCount || 0}
                            </b>{" "}
                            Thought
                        </span>

                        <span className="text-[#8B6F61]">
                            <b className="text-[#4E220F]">
                                {followingCount || 0}
                            </b>{" "}
                            Following
                        </span>

                        <span className="text-[#8B6F61]">
                            <b className="text-[#4E220F]">
                                {followersCount || 0}
                            </b>{" "}
                            Followers
                        </span>

                    </div>
                </div>
            </div>

            <div className="border-t border-[#D0B8A8]">
                <div className="flex border-b border-[#D0B8A8] sticky top-15 z-10 bg-white">
                    <button
                        type="button"
                        onClick={() => setActiveTab("posts")}
                        className={`px-6 py-4 text-sm font-semibold ${activeTab === "posts"
                                ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                                : "text-[#8D493A]"
                            }`}
                    >
                        Posts
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("thoughts")}
                        className={`px-6 py-4 text-sm font-semibold ${activeTab === "thoughts"
                                ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                                : "text-[#8D493A]"
                            }`}
                    >
                        Thoughts
                    </button>
                </div>

                {activeTab === "posts" && (
                    <OtherUserPost
                        userId={userId}
                        userData={userData}
                    />
                )}

                {activeTab === "thoughts" && (
                    <OtherUserThought
                        userId={userId}
                        userData={userData}
                    />
                )}
            </div>
        </div>
    )
}

export default OtherUserProfileContent