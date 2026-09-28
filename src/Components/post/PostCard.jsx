import React from "react"

function PostCard({ post, userData, setSelectedPost }) {

    const {
        firstName,
        lastName,
        username,
        displayPicture
    } = userData

    const isVideo =
        post.imgUrl?.includes("/video/upload/") ||
        /\.(mp4|webm|mov|m4v|avi|mkv)(\?|$)/i.test(post.imgUrl || "")

    return (
        <div
            onClick={() => setSelectedPost(post._id)}
            className="bg-white border border-[#D0B8A8] rounded-xl overflow-hidden cursor-pointer hover:border-[#8D493A] transition"
        >

            {post.imgUrl && (
                <div className="w-full h-32 sm:h-40 md:h-48 bg-[#1A120B] overflow-hidden">

                    {isVideo ? (
                        <video
                            src={post.imgUrl}
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={post.imgUrl}
                            alt="Post"
                            className="w-full h-full object-cover"
                        />
                    )}

                </div>
            )}

            <div className="p-2 sm:p-3">

                <div className="flex items-center gap-2">

                    <img
                        src={
                            displayPicture ||
                            "/muuv_pfp_dark.svg"
                        }
                        alt="Profile"
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0"
                    />

                    <div className="min-w-0">

                        <p className="text-xs font-semibold text-[#4E220F] truncate">
                            {firstName} {lastName}
                        </p>

                        <p className="text-[10px] text-[#8B6F61] truncate">
                            @{username}
                        </p>

                    </div>

                </div>

                {post.content && (
                    <p className="mt-2 text-xs sm:text-sm text-[#4A352C] truncate">
                        {post.content}
                    </p>
                )}

                <p className="mt-2 text-[10px] text-[#8B6F61]">
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
    )
}

export default PostCard