import React from "react"

function PostCard({ post, userData ,setSelectedPost}) {

    const {
        firstName,
        lastName,
        username,
        displayPicture
    } = userData

    return (
        <div 
            onClick={() => setSelectedPost(post)}
            className="bg-white border border-[#D0B8A8] rounded-xl overflow-hidden">

            {post.imgUrl && (
                <img
                    src={post.imgUrl}
                    alt="Post"
                    className="w-full h-48 object-cover"
                />
            )}

            <div className="p-3">

                <div className="flex items-center gap-2">

                    <img
                        src={displayPicture || "/muuv_pfp_dark.svg"}
                        alt="Profile"
                        className="w-7 h-7 rounded-full object-cover"
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
                    <p className="mt-2 text-sm text-[#4A352C] truncate">
                        {post.content}
                    </p>
                )}

                <p className="mt-2 text-[10px] text-[#8B6F61]">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short"
                    })}
                </p>

            </div>

        </div>
    )
}

export default PostCard