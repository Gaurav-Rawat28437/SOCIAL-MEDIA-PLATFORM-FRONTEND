import React, { useState } from "react"
import {
    Heart,
    MessageCircle,
    Repeat2,
    Bookmark,
    MoreHorizontal
} from "lucide-react"

function FeedCard({ post }) {

    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    const author = post.authorId

    const isThought = !post.imgUrl

    return (
        <div className="bg-white border border-[#D0B8A8] rounded-2xl overflow-hidden shadow-sm">

            <div className="p-5">

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                        <img
                            src={
                                author?.displayPicture ||
                                "/muuv_pfp_dark.svg"
                            }
                            alt="Profile"
                            className="w-11 h-11 rounded-full object-cover border border-[#D0B8A8]"
                        />

                        <div>

                            <div className="flex items-center gap-2">

                                <p className="font-semibold text-[#241D19]">
                                    {author?.firstName} {author?.lastName}
                                </p>

                                <p className="text-sm text-[#77716D]">
                                    @{author?.username}
                                </p>

                                <span className="text-sm text-[#77716D]">
                                    ·
                                </span>

                                <p className="text-sm text-[#77716D]">
                                    {new Date(post.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            day: "numeric",
                                            month: "short"
                                        }
                                    )}
                                </p>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="p-1 text-[#77716D] hover:text-[#241D19] transition"
                    >
                        <MoreHorizontal size={22} />
                    </button>

                </div>

                {post.content && (
                    <p
                        className={`mt-4 text-[#241D19] whitespace-pre-wrap break-words ${
                            isThought
                                ? "text-[17px] leading-7"
                                : "text-[16px] leading-6"
                        }`}
                    >
                        {post.content}
                    </p>
                )}

                {post.imgUrl && (
                    <div className="mt-4 overflow-hidden rounded-xl">

                        <img
                            src={post.imgUrl}
                            alt="Post"
                            className="w-full max-h-[520px] object-cover"
                        />

                    </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E3D9D2]">

                    <button
                        type="button"
                        className="flex items-center gap-2 text-[#77716D] hover:text-[#4E220F] transition"
                    >
                        <MessageCircle size={21} />
                        <span className="text-sm">
                            {post.commentsCount || 0}
                        </span>
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-2 text-[#77716D] hover:text-[#4E220F] transition"
                    >
                        <Repeat2 size={21} />
                        <span className="text-sm">
                            {post.repostsCount || 0}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex items-center gap-2 transition ${
                            isLiked
                                ? "text-red-500"
                                : "text-[#77716D] hover:text-red-500"
                        }`}
                    >
                        <Heart
                            size={21}
                            fill={isLiked ? "currentColor" : "none"}
                        />

                        <span className="text-sm">
                            {post.likesCount || 0}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`transition ${
                            isBookmarked
                                ? "text-[#667653]"
                                : "text-[#77716D] hover:text-[#667653]"
                        }`}
                    >
                        <Bookmark
                            size={21}
                            fill={isBookmarked ? "currentColor" : "none"}
                        />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default FeedCard