import React, { useEffect, useState } from "react"
import { Bookmark, Heart, MessageCircle, MoreVertical, Pencil, Share, Trash2, X } from "lucide-react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { deletePost, editPost } from "../../services/postServices"
import { removeThought, updateThought, updateThoughtComments, updateThoughtLike } from "../../Utils/thoughtsSlice"
import { likePost, unlikePost } from "../../services/likeServices"
import { updateFeedPostComments, updateFeedPostLike } from "../../Utils/feedSlice"
import CommentModal from "../comment/CommentModal"

function ThoughtCard({ thought, userData }) {

    const dispatch = useDispatch()

    const [isShare, setShare] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)
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

            setDeleting(true)

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

    const [likeLoading, setLikeLoading] = useState(false)

    const handleLike = async () => {

        if (likeLoading) return

        try {
            setLikeLoading(true)

            const response = thought.isLiked
                ? await unlikePost(thought._id)
                : await likePost(thought._id)

            if (response.success) {

                const isLiked = !thought.isLiked

                dispatch(
                    updateFeedPostLike({
                        postId: thought._id,
                        isLiked,
                        likesCount: response.likesCount
                    })
                )

                dispatch(
                    updateThoughtLike({
                        postId: thought._id,
                        isLiked,
                        likesCount: response.likesCount
                    })
                )

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to update like"
            )

        } finally {

            setLikeLoading(false)

        }
    }


    const [showComments, setShowComments] = useState(false)
    const handleCommentAdded = (commentsCount) => {
        dispatch(
            updateThoughtComments({
                postId: thought._id,
                commentsCount
            })
        )

        dispatch(
            updateFeedPostComments({
                postId: thought._id,
                commentsCount
            })
        )
    }

    return (
        <>
            <div className="relative bg-white border border-[#D0B8A8] rounded-xl p-3">

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-2 min-w-0">

                        <img
                            src={
                                displayPicture ||
                                "/muuv_pfp_dark.svg"
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover border border-[#D0B8A8] shrink-0"
                        />

                        <div className="min-w-0">

                            <p className="font-semibold text-sm text-[#4E220F] truncate">
                                {firstName} {lastName}
                            </p>

                            <p className="text-xs text-[#8B6F61] truncate">
                                @{username}
                            </p>

                        </div>

                    </div>

                    <div className="relative shrink-0">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-1 text-[#8B6F61] hover:text-[#4E220F] transition"
                        >
                            <MoreVertical size={18} />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 top-7 z-20 w-28 bg-white border border-[#D0B8A8] rounded-lg shadow-lg overflow-hidden">

                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#4E220F] hover:bg-[#F8EDE3] transition"
                                >
                                    <Pencil size={14} />
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => {
                                        setShowDeleteConfirm(true)
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>

                            </div>
                        )}

                    </div>

                </div>

                <p className="mt-2 text-sm text-[#4A352C] whitespace-pre-wrap break-words line-clamp-4">
                    {thought.content}
                </p>

                <p className="mt-2 text-[11px] text-[#8B6F61]">
                    {new Date(thought.createdAt).toLocaleDateString(
                        "en-US",
                        {
                            day: "numeric",
                            month: "short"
                        }
                    )}
                </p>

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        mt-2
                        pt-2
                        border-t
                        border-[#D0B8A8]
                    "
                >

                    <button
                        type="button"
                        disabled={likeLoading}
                        onClick={handleLike}
                        className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                min-w-[70px]
                                h-10
                                px-3
                                rounded-full
                                border
                                border-transparent
                                text-[#1A120B]
                                hover:bg-[#D5CEA3]
                                hover:border-[#1A120B]
                                transition-all
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                    >
                        <Heart
                            size={20}
                            className="shrink-0 text-[#1A120B]"
                            fill={thought.isLiked ? "currentColor" : "none"}
                        />

                        <span className="text-sm text-[#1A120B]">
                            {thought.likesCount || 0}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowComments(true)}
                        className="
                                flex items-center justify-center gap-2 min-w-[70px] h-10 px-3
                                rounded-full border border-transparent text-[#1A120B]
                                hover:bg-[#D5CEA3] hover:border-[#1A120B] transition-all
                            "
                    >
                        <MessageCircle
                            size={20}
                            className="shrink-0 text-[#1A120B]"
                        />

                        <span className="text-sm text-[#1A120B]">
                            {thought.commentsCount || 0}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setShare(!isShare)}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-1
                            min-w-[40px]
                            h-7
                            px-1.5
                            rounded-full
                            border
                            border-transparent
                            text-[#1A120B]
                            hover:bg-[#D5CEA3]
                            hover:border-[#1A120B]
                            transition-all
                        "
                    >

                        <Share
                            size={16}
                            className="shrink-0 text-[#1A120B]"
                        />

                        <span className="text-[11px] text-[#1A120B]">
                            {thought.repostsCount || 0}
                        </span>

                    </button>

                    <button
                        type="button"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className="
                            w-7
                            h-7
                            flex
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-transparent
                            text-[#1A120B]
                            hover:bg-[#D5CEA3]
                            hover:border-[#1A120B]
                            transition-all
                        "
                    >

                        <Bookmark
                            size={16}
                            className="shrink-0 text-[#1A120B]"
                            fill={isBookmarked ? "#1A120B" : "none"}
                        />

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

            {showDeleteConfirm && (

                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">

                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">

                        <h3 className="text-lg font-semibold text-[#4E220F]">
                            Delete thought?
                        </h3>

                        <p className="mt-2 text-sm text-[#8B6F61]">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-6">

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={() =>
                                    setShowDeleteConfirm(false)
                                }
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
                                {deleting
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {showComments && (
                <CommentModal
                    postId={thought._id}
                    onClose={() => setShowComments(false)}
                    onCommentAdded={handleCommentAdded}
                />
            )}
        </>
    )
}

export default ThoughtCard