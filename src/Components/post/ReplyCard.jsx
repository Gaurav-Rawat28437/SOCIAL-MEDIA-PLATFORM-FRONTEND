import React, { useState } from "react"
import { getPostById } from "../../services/postServices"
import PostModal from "../post/PostModal"
import toast from "react-hot-toast"

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
            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to load post"
            )
        } finally {
            setLoading(false)
        }
    }

    const isVideo = comment.post?.imgUrl?.includes("/video/upload/")

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

                {comment.post && (
                    <div>

                        <div className="flex items-center gap-3">

                            <img
                                src={
                                    comment.post.authorId?.displayPicture ||
                                    "/muuv_pfp_dark.svg"
                                }
                                alt="Original post owner"
                                className="
                                    w-11
                                    h-11
                                    rounded-full
                                    object-cover
                                    border-2
                                    border-[#D5CEA3]
                                "
                            />

                            <div className="flex-1">

                                <p className="
                                    text-sm
                                    font-bold
                                    text-[#1A120B]
                                ">
                                    {comment.post.authorId?.firstName}{" "}
                                    {comment.post.authorId?.lastName}
                                </p>

                                <p className="
                                    text-xs
                                    text-[#8B6F61]
                                ">
                                    @{comment.post.authorId?.username}
                                </p>

                            </div>

                            <span className="
                                text-xs
                                text-[#8B6F61]
                            ">
                                {type === "post" ? "Post" : "Thought"}
                            </span>

                        </div>

                        <div className="
                            mt-4
                            rounded-xl
                            bg-[#F8EDE3]
                            overflow-hidden
                        ">

                            {comment.post.content && (
                                <p className="
                                    px-4
                                    pt-3
                                    text-sm
                                    text-[#4A352C]
                                    leading-relaxed
                                    break-words
                                ">
                                    {comment.post.content}
                                </p>
                            )}

                            {comment.post.imgUrl && (
                                isVideo ? (
                                    <video
                                        src={comment.post.imgUrl}
                                        className="
                                            mt-3
                                            w-full
                                            max-h-80
                                            object-cover
                                        "
                                        controls
                                        onClick={e => e.stopPropagation()}
                                    />
                                ) : (
                                    <img
                                        src={comment.post.imgUrl}
                                        alt="Original post"
                                        className="
                                            mt-3
                                            w-full
                                            max-h-80
                                            object-cover
                                        "
                                        onClick={e => e.stopPropagation()}
                                    />
                                )
                            )}

                        </div>

                    </div>
                )}

                <div className="
                    mt-4
                    rounded-xl
                    bg-[#DFD3C3]
                    px-4
                    py-3
                ">

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