import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
    Image,
    Video,
    Smile
} from "lucide-react"
import CreatePostModal from "../post/CreatePostModal"

function PostComposer() {

    const [
        showCreatePost,
        setShowCreatePost
    ] = useState(false)

    const userData = useSelector(
        store => store.User?.data || {}
    )

    return (
        <>
            <div
                className="
                    bg-[#D5CEA3]
                    text-[#1A120B]
                    border
                    border-[#1A120B]
                    rounded-2xl
                    p-3
                    sm:p-4
                    shadow-[0_3px_12px_rgba(141,73,58,0.07)]
                    transition
                "
            >

                <div
                    onClick={() =>
                        setShowCreatePost(
                            true
                        )
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        sm:gap-3
                        cursor-pointer
                    "
                >

                    <img
                        src={
                            userData.displayPicture ||
                            "/muuv_pfp_dark.svg"
                        }
                        alt="Profile"
                        className="
                            w-10
                            h-10
                            sm:w-11
                            sm:h-11
                            rounded-full
                            object-cover
                            border
                            border-[#1A120B]
                            bg-[#D0B8A8]
                            shrink-0
                        "
                    />

                    <div
                        className="
                            flex-1
                            min-w-0
                            bg-[#E5E5CB]
                            border
                            border-[#1A120B]
                            rounded-full
                            px-4
                            sm:px-5
                            py-2.5
                            sm:py-3
                            hover:bg-white
                            hover:text-[#1A120B]
                            transition
                            truncate
                        "
                    >
                        What's on your mind?
                    </div>

                </div>

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-3
                        mt-4
                        pt-3
                        border-t
                        border-[#1A120B]
                    "
                >

                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        sm:gap-5
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                setShowCreatePost(
                                    true
                                )
                            }
                            className="
                                flex
                                items-center
                                gap-1.5
                                sm:gap-2
                                cursor-pointer
                                hover:text-white
                                transition
                            "
                        >

                            <Image size={19} />

                            <span className="text-xs sm:text-sm font-medium">
                                Photo
                            </span>

                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setShowCreatePost(
                                    true
                                )
                            }
                            className="
                                flex
                                items-center
                                gap-1.5
                                sm:gap-2
                                hover:text-white
                                cursor-pointer
                                transition
                            "
                        >

                            <Video size={19} />

                            <span className="text-xs sm:text-sm font-medium">
                                Video
                            </span>

                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setShowCreatePost(
                                    true
                                )
                            }
                            className="
                                flex
                                items-center
                                gap-1.5
                                sm:gap-2
                                cursor-pointer
                                hover:text-white
                                transition
                            "
                        >

                            <Smile size={19} />

                            <span className="text-xs sm:text-sm font-medium">
                                Feeling
                            </span>

                        </button>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowCreatePost(
                                true
                            )
                        }
                        className="
                            px-5
                            sm:px-6
                            py-2
                            rounded-full
                            bg-[#3C2A21]
                            text-[#F8EDE3]
                            border
                            border-[#8D493A]
                            font-semibold
                            hover:bg-[#E5E5CB]
                            hover:text-[#3C2A21]
                            hover:border-[#3C2A21]
                            transition
                        "
                    >
                        Post
                    </button>

                </div>

            </div>

            {showCreatePost && (

                <CreatePostModal
                    setShowCreatePost={
                        setShowCreatePost
                    }
                />

            )}

        </>
    )
}

export default PostComposer