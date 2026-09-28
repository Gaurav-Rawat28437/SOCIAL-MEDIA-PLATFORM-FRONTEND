import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Calendar } from "lucide-react"
import EditProfileModal from "./EditProfileModal"
import PostContent from "../post/PostContent"
import FollowerModal from "../followers&following/FollowersModal"
import FollowingModal from "../followers&following/FollowingModal"

function ProfileContent() {

    const userData = useSelector(store => store?.User?.data || {})

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing,setShowFollowing] =useState(false)

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

    const [showEdit, setShowEdit] = useState(false)

    return (
        <div className="w-full max-w-4xl mx-auto">

            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-r from-[#9D6638] to-[#B0BA99]">
                <img
                    src={coverPicture || "/muuv_display_picture.svg"}
                    alt="Cover"
                    className={`w-full h-full ${coverPicture ? "object-cover" : "object-contain"
                        }`}
                />
            </div>

            <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6">

                <div className="flex justify-between items-start gap-3">

                    <div className="-mt-10 sm:-mt-12 md:-mt-14">

                        <img
                            src={
                                displayPicture ||
                                "/muuv_pfp_dark.svg"
                            }
                            alt="Profile"
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#4E220F] border-4 border-white object-cover"
                        />

                    </div>

                    <button
                        onClick={() => setShowEdit(true)}
                        type="button"
                        className="mt-3 sm:mt-4 px-3 sm:px-5 py-2 rounded-full border-2 border-[#3C2A21] text-[#3C2A21] text-sm sm:text-base font-semibold hover:bg-[#3C2A21] hover:border-2 hover:border-[#D5CEA3] hover:text-white transition"
                    >
                        Edit Profile
                    </button>

                </div>

                <div className="mt-3">

                    <h1 className="text-xl sm:text-2xl font-bold text-[#4E220F]">
                        {firstName} {lastName}
                    </h1>

                    <p className="text-[#9D6638] text-sm sm:text-base break-all">
                        @{username}
                    </p>

                    <p className="mt-3 max-w-xl text-sm sm:text-base text-[#4A352C] break-words">
                        {bio || "Welcome to my Muuv profile 👋"}
                    </p>

                    <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 text-xs sm:text-sm text-[#8B6F61]">

                        <div className="flex items-center gap-1">

                            <Calendar size={16} />

                            Joined{" "}

                            {createdAt &&
                                new Date(createdAt).toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric"
                                })
                            }

                        </div>

                    </div>

                    <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mt-4 text-xs sm:text-sm">

                        <button className="text-[#8B6F61]">

                            <b className="text-[#4E220F]">
                                {postCount || 0}
                            </b>{" "}
                            Post

                        </button>

                        <button className="text-[#8B6F61]">

                            <b className="text-[#4E220F]">
                                {thoughtCount || 0}
                            </b>{" "}
                            thougth

                        </button>

                        <button
                            onClick={()=>{
                                setShowFollowing(true)
                            }}
                            className="text-[#8B6F61] cursor-pointer"
                        >

                            <b className="text-[#4E220F]">
                                {followingCount || 0}
                            </b>{" "}
                            Following

                        </button>

                        <button
                            onClick={() => {
                                setShowFollowers(true)
                            }}
                            className="text-[#8B6F61] cursor-pointer"
                        >

                            <b className="text-[#4E220F]">
                                {followersCount || 0}
                            </b>{" "}
                            Followers

                        </button>

                    </div>

                </div>

            </div>

            <PostContent userData={userData} />

            {showEdit && (
                <EditProfileModal setShowEdit={setShowEdit} />
            )}

            {showFollowers && (
                <FollowerModal
                    userId={userData._id}
                    onClose={() => setShowFollowers(false)}
                />
            )}

            {showFollowing && (
                <FollowingModal
                    userId={userData._id}
                    onClose={() => setShowFollowing(false)}
                />
            )}

        </div>
    )
}

export default ProfileContent