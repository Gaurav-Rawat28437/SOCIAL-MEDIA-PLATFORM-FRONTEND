import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Calendar } from "lucide-react"
import EditProfileModal from "./EditProfileModal"
import PostContent from "../post/PostContent"

function ProfileContent() {

    const userData = useSelector(store => store?.User?.data || {})

    const {
        bio,
        createdAt,
        displayPicture,
        firstName,
        coverPicture,
        followers = [],
        following = [],
        lastName,
        username
    } = userData

    const [showEdit, setShowEdit] = useState(false)

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
                            src={
                                displayPicture ||
                                "/muuv_pfp_dark.svg"
                            }
                            alt="Profile"
                            className="w-28 h-28 rounded-full bg-[#4E220F] border-4 border-white object-cover"
                        />

                    </div>

                    <button
                        onClick={() => setShowEdit(true)}
                        type="button"
                        className="mt-4 px-5 py-2 rounded-full border-2 border-[#3C2A21] text-[#3C2A21] font-semibold hover:bg-[#3C2A21] hover:border-2 hover:border-[#D5CEA3] hover:text-white transition"
                    >
                        Edit Profile
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
                                new Date(createdAt).toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric"
                                })
                            }

                        </div>

                    </div>

                    <div className="flex gap-6 mt-4 text-sm">

                        <span className="text-[#8B6F61]">
                            <b className="text-[#4E220F]">
                                {following.length}
                            </b>{" "}
                            Following
                        </span>

                        <span className="text-[#8B6F61]">
                            <b className="text-[#4E220F]">
                                {followers.length}
                            </b>{" "}
                            Followers
                        </span>

                    </div>

                </div>

            </div>

             <PostContent userData={userData} />

            {showEdit && (
                <EditProfileModal setShowEdit={setShowEdit} />
            )}

        </div>
    )
}

export default ProfileContent