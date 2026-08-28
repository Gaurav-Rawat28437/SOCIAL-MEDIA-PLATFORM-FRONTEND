import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Calendar } from "lucide-react"
import EditProfileModal from "./EditProfileModal"

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
                        className="mt-4 px-5 py-2 rounded-full border-2 border-[#9D6638] text-[#9D6638] font-semibold hover:bg-[#9D6638] hover:text-white transition"
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

            <div className="border-t border-[#D0B8A8]">

                <div className="flex border-b border-[#D0B8A8]">

                    <button
                        type="button"
                        className="px-6 py-4 text-sm font-semibold text-[#4E220F] border-b-2 border-[#9D6638]"
                    >
                        Posts
                    </button>

                    <button
                        type="button"
                        className="px-6 py-4 text-sm font-semibold text-[#8B6F61] hover:text-[#4E220F]"
                    >
                        Replies
                    </button>

                    <button
                        type="button"
                        className="px-6 py-4 text-sm font-semibold text-[#8B6F61] hover:text-[#4E220F]"
                    >
                        Media
                    </button>

                    <button
                        type="button"
                        className="px-6 py-4 text-sm font-semibold text-[#8B6F61] hover:text-[#4E220F]"
                    >
                        Likes
                    </button>

                </div>

                <div className="p-6 space-y-4">

                    <div className="bg-white border border-[#D0B8A8] rounded-2xl p-5">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-[#4E220F] flex items-center justify-center text-[#F7F1DE] font-semibold">
                                {firstName?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div>

                                <p className="font-semibold text-[#4E220F]">
                                    {firstName || "User"}
                                </p>

                                <p className="text-xs text-[#8B6F61]">
                                    3h
                                </p>

                            </div>

                        </div>

                        <p className="mt-4 text-[#4A352C]">
                            Morning run through the park, best way to start the day.
                        </p>

                        <div className="flex gap-6 mt-4 text-sm text-[#9D6638]">
                            <span>💬 12</span>
                            <span>🔁 4</span>
                            <span>❤️ 38</span>
                            <span>↗</span>
                        </div>

                    </div>

                    <div className="bg-white border border-[#D0B8A8] rounded-2xl p-5">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-[#9D6638] flex items-center justify-center text-[#F7F1DE] font-semibold">
                                {firstName?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div>

                                <p className="font-semibold text-[#4E220F]">
                                    {firstName || "User"}
                                </p>

                                <p className="text-xs text-[#8B6F61]">
                                    1d
                                </p>

                            </div>

                        </div>

                        <p className="mt-4 text-[#4A352C]">
                            Building something new with Muuv 🚀
                        </p>

                        <div className="flex gap-6 mt-4 text-sm text-[#9D6638]">
                            <span>💬 6</span>
                            <span>🔁 1</span>
                            <span>❤️ 21</span>
                            <span>↗</span>
                        </div>

                    </div>

                </div>

            </div>

            {showEdit && (
                <EditProfileModal setShowEdit={setShowEdit} />
            )}

        </div>
    )
}

export default ProfileContent