import React, { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { editPost } from "../../services/postServices"
import { updatePost } from "../../Utils/postsSlice"
import { updateFeedPost } from "../../Utils/feedSlice"

function EditPostModal({ post, setShowEdit, setSelectedPost }) {

    const dispatch = useDispatch()

    const [content, setContent] = useState(post.content || "")
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            const response = await editPost(
                post._id,
                content
            )

            if (response.success) {

                dispatch(updatePost(response.data))

                dispatch(updateFeedPost(response.data))

                toast.success(
                    response.msg || "Post updated successfully"
                )

                setShowEdit(false)
                setSelectedPost(null)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                "Unable to update post"
            )

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-2 sm:p-4">

            <div className="bg-white w-full max-w-xl max-h-[95vh] rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">

                <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[#D0B8A8]">

                    <h2 className="text-base sm:text-lg font-semibold text-[#4A352C]">
                        Edit Post
                    </h2>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setShowEdit(false)}
                        className="p-1.5 sm:p-2 rounded-full hover:bg-[#F8EDE3] text-[#4A352C]"
                    >
                        <X size={19} className="sm:w-[21px] sm:h-[21px]" />
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="p-4 sm:p-5">

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={500}
                            rows={6}
                            placeholder="Write something..."
                            className="w-full resize-none outline-none text-sm sm:text-base text-[#4A352C] placeholder-[#A99588]"
                        />

                        <div className="text-right text-[10px] sm:text-xs text-[#8B6F61]">
                            {content.length}/500
                        </div>

                    </div>

                    <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-[#D0B8A8] flex justify-end gap-2 sm:gap-3">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setShowEdit(false)}
                            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base text-[#4A352C] hover:bg-[#F8EDE3] transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#3C2A21] text-sm sm:text-base text-white font-semibold hover:bg-[#2F211A] disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditPostModal