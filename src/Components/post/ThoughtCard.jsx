import React, { useState } from "react"
import { Heart, MessageCircle, MoreVertical, Pencil, Trash2, X } from "lucide-react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { deletePost, editPost } from "../../services/postServices"
import { removeThought, updateThought } from "../../Utils/thoughtsSlice"

function ThoughtCard({ thought, userData }) {

    const dispatch = useDispatch()

    const [isLiked, setIsLiked] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [content, setContent] = useState(thought.content)
    const [loading, setLoading] = useState(false)

    const {
        firstName,
        lastName,
        username,
        displayPicture
    } = userData

    const handleEdit = () => {
        setShowMenu(false)
        setContent(thought.content)
        setShowEdit(true)
    }

    const handleDelete = async () => {

        setShowMenu(false)

        try {

            setLoading(true)

            const response = await deletePost(thought._id)

            if (response.success) {

                dispatch(removeThought(thought._id))

                toast.success(
                    response.msg || "Thought deleted successfully"
                )

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to delete thought"
            )

        } finally {

            setLoading(false)

        }
    }

    const handleUpdate = async (e) => {

        e.preventDefault()

        if (!content.trim()) {
            toast.error("Thought cannot be empty")
            return
        }

        try {

            setLoading(true)

            const response = await editPost(
                thought._id,
                content.trim()
            )

            if (response.success) {

                dispatch(updateThought(response.data))

                setShowEdit(false)

                toast.success(
                    response.msg || "Thought updated successfully"
                )

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to update thought"
            )

        } finally {

            setLoading(false)

        }
    }

    return (
        <>
            <div className="relative bg-white border border-[#D0B8A8] rounded-xl p-5">

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                        <img
                            src={
                                displayPicture ||
                                "/muuv_pfp_dark.svg"
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-[#D0B8A8]"
                        />

                        <div>

                            <p className="font-semibold text-[#4E220F]">
                                {firstName} {lastName}
                            </p>

                            <p className="text-sm text-[#8B6F61]">
                                @{username}
                            </p>

                        </div>

                    </div>

                    <div className="relative">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1 text-[#8B6F61] hover:text-[#4E220F] transition"
                        >
                            <MoreVertical size={20} />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 top-8 z-20 w-32 bg-white border border-[#D0B8A8] rounded-lg shadow-lg overflow-hidden">

                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#4E220F] hover:bg-[#F8EDE3] transition"
                                >
                                    <Pencil size={15} />
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleDelete}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                                >
                                    <Trash2 size={15} />
                                    Delete
                                </button>

                            </div>
                        )}

                    </div>

                </div>

                <p className="mt-4 text-[#4A352C] whitespace-pre-wrap break-words">
                    {thought.content}
                </p>

                <p className="mt-3 text-xs text-[#8B6F61]">
                    {new Date(thought.createdAt).toLocaleDateString(
                        "en-US",
                        {
                            day: "numeric",
                            month: "short"
                        }
                    )}
                </p>

                <div className="flex gap-5 mt-3 pt-3 border-t border-[#D0B8A8]">

                    <button
                        type="button"
                        onClick={() => setIsLiked(!isLiked)}
                        className="relative w-7 h-7"
                    >

                        <i
                            className={`fa-solid fa-heart text-[23px] mt-[1px] ${
                                isLiked
                                    ? "text-red-500"
                                    : "text-white"
                            }`}
                        ></i>

                        <Heart
                            size={27}
                            className={`absolute bottom-[1px] right-0 ${
                                isLiked
                                    ? "text-red-500"
                                    : "text-[#9D6638] hover:text-[#4E220F]"
                            }`}
                        />

                    </button>

                    <button
                        type="button"
                        className="text-[#9D6638] hover:text-[#4E220F] transition"
                    >
                        <MessageCircle size={24} />
                    </button>

                </div>

            </div>

            {showEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D0B8A8]">

                            <h2 className="text-xl font-semibold text-[#4A352C]">
                                Edit Thought
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

                        <form onSubmit={handleUpdate}>

                            <div className="p-5">

                                <textarea
                                    value={content}
                                    onChange={(e) =>
                                        setContent(e.target.value)
                                    }
                                    maxLength={500}
                                    rows={6}
                                    disabled={loading}
                                    className="w-full resize-none outline-none text-[#4A352C] border border-[#D0B8A8] rounded-xl p-4"
                                />

                                <div className="text-right text-xs text-[#8B6F61] mt-1">
                                    {content.length}/500
                                </div>

                            </div>

                            <div className="px-5 py-4 border-t border-[#D0B8A8] flex justify-end gap-3">

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setShowEdit(false)}
                                    className="px-5 py-2.5 rounded-full border border-[#D0B8A8] text-[#4A352C]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 rounded-full bg-[#3C2A21] text-white font-semibold disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}
        </>
    )
}

export default ThoughtCard