import React, { useState } from "react"
import { getPostById } from "../../services/postServices"
import PostModal from "../post/PostModal"

function ReplyCard({ comment, type }) {

    const [selectedPost, setSelectedPost] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleReplyClick = async () => {
        try {
            setLoading(true)

            const response = await getPostById(comment.post?._id)

            if (response.success) {
                setSelectedPost(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div
                onClick={handleReplyClick}
                className="
                    rounded-2xl
                    border
                    border-[#D0B8A8]
                    bg-white
                    p-5
                    hover:shadow-md
                    transition
                    cursor-pointer
                "
            >

                <div className="flex items-center gap-3">

                    <img
                        src={
                            comment.user?.displayPicture ||
                            "/muuv_pfp_dark.svg"
                        }
                        alt="Reply user"
                        className="
                            w-10
                            h-10
                            rounded-full
                            object-cover
                            border-2
                            border-[#D5CEA3]
                        "
                    />

                    <div className="flex-1">

                        <p className="text-sm font-bold text-[#1A120B]">
                            {comment.user?.firstName}{" "}
                            {comment.user?.lastName}
                        </p>

                        <p className="text-xs text-[#8B6F61]">
                            @{comment.user?.username}
                        </p>

                    </div>

                    <span className="text-xs text-[#8B6F61]">
                        {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                day: "numeric",
                                month: "short"
                            }
                        )}
                    </span>

                </div>


                {comment.post && (
                    <div
                        className="
                            mt-4
                            rounded-xl
                            bg-[#F8EDE3]
                            px-4
                            py-3
                            border-l-4
                            border-[#9D6638]
                        "
                    >

                        <p className="
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-[#8B6F61]
                            mb-3
                        ">
                            {type === "post"
                                ? "Original Post"
                                : "Original Thought"}
                        </p>


                        <div className="flex items-center gap-2 mb-3">

                            <img
                                src={
                                    comment.post.authorId?.displayPicture ||
                                    "/muuv_pfp_dark.svg"
                                }
                                alt="Original post owner"
                                className="
                                    w-8
                                    h-8
                                    rounded-full
                                    object-cover
                                    border
                                    border-[#D5CEA3]
                                "
                            />

                            <div>

                                <p className="
                                    text-xs
                                    font-semibold
                                    text-[#1A120B]
                                ">
                                    {comment.post.authorId?.firstName}{" "}
                                    {comment.post.authorId?.lastName}
                                </p>

                                <p className="
                                    text-[10px]
                                    text-[#8B6F61]
                                ">
                                    @{comment.post.authorId?.username}
                                </p>

                            </div>

                        </div>


                        <p className="
                            text-sm
                            text-[#4A352C]
                            line-clamp-2
                        ">
                            {comment.post.content}
                        </p>

                    </div>
                )}


                <div
                    className="
                        mt-4
                        rounded-xl
                        bg-[#DFD3C3]
                        px-4
                        py-3
                    "
                >

                    <p className="
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-[#9D6638]
                        mb-2
                    ">
                        Your Reply
                    </p>

                    <p className="
                        text-sm
                        text-[#1A120B]
                        leading-relaxed
                        break-words
                    ">
                        {comment.content}
                    </p>

                </div>


                {loading && (
                    <p className="
                        mt-3
                        text-xs
                        text-[#9D6638]
                    ">
                        Loading post...
                    </p>
                )}

            </div>


            {selectedPost && (
                <PostModal
                    post={selectedPost}
                    userData={selectedPost.authorId}
                    setSelectedPost={setSelectedPost}
                />
            )}

        </>
    )
}

export default ReplyCard