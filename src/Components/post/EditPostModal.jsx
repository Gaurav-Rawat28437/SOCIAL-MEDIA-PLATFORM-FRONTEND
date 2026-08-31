import React, { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { editPost } from "../../services/postServices"
import { updatePost } from "../../Utils/postsSlice"

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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl">

                <div className="flex items-center justify-between px-5 py-4 border-b border-[#D0B8A8]">

                    <h2 className="text-lg font-semibold text-[#4A352C]">
                        Edit Post
                    </h2>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setShowEdit(false)}
                        className="p-2 rounded-full hover:bg-[#F8EDE3] text-[#4A352C]"
                    >
                        <X size={21} />
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="p-5">

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={500}
                            rows={6}
                            placeholder="Write something..."
                            className="w-full resize-none outline-none text-[#4A352C] placeholder-[#A99588]"
                        />

                        <div className="text-right text-xs text-[#8B6F61]">
                            {content.length}/500
                        </div>

                    </div>

                    <div className="px-5 py-4 border-t border-[#D0B8A8] flex justify-end gap-3">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setShowEdit(false)}
                            className="px-5 py-2.5 rounded-full text-[#4A352C] hover:bg-[#F8EDE3] transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-full bg-[#3C2A21] text-white font-semibold hover:bg-[#2F211A] disabled:opacity-50 disabled:cursor-not-allowed transition"
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