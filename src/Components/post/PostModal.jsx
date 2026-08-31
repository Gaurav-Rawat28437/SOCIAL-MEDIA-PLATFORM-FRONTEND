import React, { useEffect, useState } from "react"
import { Heart, MessageCircle, X, MoreVertical } from "lucide-react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { deletePost } from "../../services/postServices"
import { removePost } from "../../Utils/postsSlice"
import EditPostModal from "./EditPostModal"

function PostModal({ post, userData, setSelectedPost }) {

    const dispatch = useDispatch()

    const [isLiked, setIsLiked] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }

    }, [])

    const handleDelete = async () => {

        try {

            setDeleting(true)

            const response = await deletePost(post._id)

            if (response.success) {

                dispatch(removePost(post._id))

                toast.success(
                    response.msg || "Post deleted successfully"
                )

                setSelectedPost(null)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                "Unable to delete post"
            )

        } finally {

            setDeleting(false)

        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-y-auto [&::-webkit-scrollbar]:hidden">

                <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-[#D0B8A8]">

                    <h2 className="font-semibold text-[#4E220F]">
                        Post
                    </h2>

                    <div className="flex items-center gap-1">

                        <div className="relative">

                            <button
                                type="button"
                                onClick={() => setShowOptions(!showOptions)}
                                className="p-2 rounded-full hover:bg-[#F8EDE3] text-[#4E220F]"
                            >
                                <MoreVertical size={20} />
                            </button>

                            {showOptions && (
                                <div className="absolute right-0 top-11 w-32 bg-white border border-[#D0B8A8] rounded-xl shadow-lg overflow-hidden">


                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowOptions(false)
                                            setShowEdit(true)
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-sm text-[#4A352C] hover:bg-[#F8EDE3]"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowOptions(false)
                                            setShowDeleteConfirm(true)
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-[#F8EDE3]"
                                    >
                                        Delete
                                    </button>

                                </div>
                            )}

                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedPost(null)}
                            className="p-2 rounded-full hover:bg-[#F8EDE3] text-[#4E220F]"
                        >
                            <X size={20} />
                        </button>

                    </div>

                </div>

                <div className="flex justify-center px-5 pt-5">

                    <img
                        src={post.imgUrl}
                        alt="Post"
                        className="max-w-full max-h-[45vh] object-contain rounded-xl"
                    />

                </div>

                <div className="p-5">

                    <div className="flex items-center gap-3">

                        <img
                            src={
                                userData.displayPicture ||
                                "/muuv_pfp_dark.svg"
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-[#D0B8A8]"
                        />

                        <div>

                            <p className="font-semibold text-[#4E220F]">
                                {userData.firstName} {userData.lastName}
                            </p>

                            <p className="text-sm text-[#8B6F61]">
                                @{userData.username}
                            </p>

                        </div>

                    </div>

                    {post.content && (
                        <p className="mt-4 text-[#4A352C] whitespace-pre-wrap break-words">
                            {post.content}
                        </p>
                    )}

                    <div className="flex gap-5 mt-2 pt-2 border-t border-[#D0B8A8]">

                        <button
                            type="button"
                            onClick={() => setIsLiked(!isLiked)}
                            className="relative w-7 h-7"
                        >

                            <i
                                className={`fa-solid fa-heart text-[23px] mt-[1px] ${isLiked
                                    ? "text-red-500"
                                    : "text-white"
                                    }`}
                            ></i>

                            <Heart
                                size={27}
                                className={`absolute bottom-[1px] right-0 ${isLiked
                                    ? "text-red-500"
                                    : "text-[#9D6638] hover:text-[#4E220F]"
                                    }`}
                            />

                        </button>

                        <button
                            type="button"
                            className="text-[#9D6638] hover:text-[#4E220F] transition"
                        >
                            <MessageCircle />
                        </button>

                    </div>

                </div>

            </div>

            {showDeleteConfirm && (

                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">

                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">

                        <h3 className="text-lg font-semibold text-[#4E220F]">
                            Delete post?
                        </h3>

                        <p className="mt-2 text-sm text-[#8B6F61]">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-[#4A352C] hover:bg-[#F8EDE3] transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

           {showEdit && (
    <EditPostModal
        post={post}
        setShowEdit={setShowEdit}
        setSelectedPost={setSelectedPost}
    />
)}

        </div>
    )
}

export default PostModal