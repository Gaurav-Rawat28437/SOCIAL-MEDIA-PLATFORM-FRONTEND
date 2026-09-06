import React, { useEffect, useState } from "react"
import { X, Send, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { getComments, addComment, deleteComment, editComment} from "../../services/commentService"

function CommentModal({ postId, onClose, onCommentAdded }) {

    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [deleteCommentId, setDeleteCommentId] = useState(null)
    const [openCommentMenu, setOpenCommentMenu] = useState(null)

    const [editCommentId, setEditCommentId] = useState(null)
    const [editContent, setEditContent] = useState("")
    const [editing, setEditing] = useState(false)

    const userData = useSelector(
        store => store.User?.data
    )

    const fetchComments = async () => {
        try {
            setLoading(true)

            const response = await getComments(postId)

            if (response.success) {
                setComments(response.data || [])
            }
        } catch (error) {
            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to load comments"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [postId])

    const handleAddComment = async (e) => {
        e.preventDefault()

        if (!content.trim()) {
            return
        }

        try {
            setAdding(true)

            const response = await addComment(
                postId,
                content.trim()
            )

            if (response.success) {
                setContent("")

                if (onCommentAdded) {
                    onCommentAdded(response.commentsCount)
                }

                await fetchComments()

                toast.success(
                    response.msg || "Comment added successfully"
                )
            }
        } catch (error) {
            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to add comment"
            )
        } finally {
            setAdding(false)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await deleteComment(commentId)

            if (response.success) {
                setComments(prev =>
                    prev.filter(
                        comment => comment._id !== commentId
                    )
                )

                if (onCommentAdded) {
                    onCommentAdded(response.commentsCount)
                }

                toast.success(
                    response.msg || "Comment deleted successfully"
                )
            }
        } catch (error) {
            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to delete comment"
            )
        }
    }

    const handleEditComment = async (commentId) => {
        if (!editContent.trim()) {
            return
        }

        try {
            setEditing(true)

            const response = await editComment(
                commentId,
                editContent.trim()
            )

            if (response.success) {
                setComments(prev =>
                    prev.map(comment =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                content: response.data.content
                            }
                            : comment
                    )
                )

                setEditCommentId(null)
                setEditContent("")

                toast.success(
                    response.msg || "Comment updated successfully"
                )
            }
        } catch (error) {
            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.message ||
                "Unable to update comment"
            )
        } finally {
            setEditing(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">

            {loading ? (

                <div className="
                    w-full
                    max-w-lg
                    h-[500px]
                    flex
                    items-center
                    justify-center
                    bg-[#F8EDE3]
                    rounded-2xl
                    border
                    border-[#D0B8A8]
                    shadow-2xl
                ">
                    <p className="text-sm text-[#8B6F61]">
                        Loading comments...
                    </p>
                </div>

            ) : (

                <div className="
                    w-full
                    max-w-lg
                    bg-[#F8EDE3]
                    rounded-2xl
                    border
                    border-[#D0B8A8]
                    shadow-2xl
                    overflow-hidden
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        px-4
                        py-3
                        border-b
                        border-[#D0B8A8]
                    ">

                        <h2 className="text-lg font-semibold text-[#4E220F]">
                            Comments
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                p-2
                                rounded-full
                                text-[#8B6F61]
                                hover:bg-[#D5CEA3]
                                hover:text-[#1A120B]
                                transition
                            "
                        >
                            <X size={20} />
                        </button>

                    </div>

                    <div className="h-[400px] overflow-y-auto p-4">

                        {comments.length === 0 ? (

                            <div className="
                                flex
                                items-center
                                justify-center
                                h-full
                            ">
                                <p className="text-sm text-[#8B6F61]">
                                    No comments yet
                                </p>
                            </div>

                        ) : (

                            <div className="space-y-4">

                                {comments.map(comment => (

                                    <div
                                        key={comment._id}
                                        className="flex gap-3"
                                    >

                                        <img
                                            src={
                                                comment.user?.displayPicture ||
                                                "/muuv_pfp_dark.svg"
                                            }
                                            alt="Profile"
                                            className="
                                                w-9
                                                h-9
                                                rounded-full
                                                object-cover
                                                border
                                                border-[#D0B8A8]
                                                shrink-0
                                            "
                                        />

                                        <div className="min-w-0 flex-1">

                                            <div className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-2
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    min-w-0
                                                ">

                                                    <p className="
                                                        text-sm
                                                        font-semibold
                                                        text-[#4E220F]
                                                        truncate
                                                    ">
                                                        {comment.user?.firstName}{" "}
                                                        {comment.user?.lastName}
                                                    </p>

                                                    <p className="
                                                        text-xs
                                                        text-[#8B6F61]
                                                        truncate
                                                    ">
                                                        @{comment.user?.username}
                                                    </p>

                                                </div>

                                                {comment.user?.username === userData?.username && (
                                                    <div className="relative shrink-0">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setOpenCommentMenu(
                                                                    openCommentMenu === comment._id
                                                                        ? null
                                                                        : comment._id
                                                                )
                                                            }
                                                            className="
                                                                p-1.5
                                                                rounded-full
                                                                text-[#8B6F61]
                                                                hover:bg-[#D5CEA3]
                                                                hover:text-[#4E220F]
                                                                transition
                                                            "
                                                        >
                                                            <MoreVertical size={17} />
                                                        </button>

                                                        {openCommentMenu === comment._id && (
                                                            <div className="
                                                                absolute
                                                                right-0
                                                                top-8
                                                                z-10
                                                                w-24
                                                                bg-[#F8EDE3]
                                                                border
                                                                border-[#D0B8A8]
                                                                rounded-lg
                                                                shadow-lg
                                                                overflow-hidden
                                                            ">

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setEditCommentId(comment._id)
                                                                        setEditContent(comment.content)
                                                                        setOpenCommentMenu(null)
                                                                    }}
                                                                    className="
                                                                        w-full
                                                                        flex
                                                                        items-center
                                                                        gap-2
                                                                        px-3
                                                                        py-2
                                                                        text-xs
                                                                        text-[#4E220F]
                                                                        hover:bg-[#D5CEA3]
                                                                        transition
                                                                    "
                                                                >
                                                                    <Pencil size={14} />
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setDeleteCommentId(comment._id)
                                                                        setOpenCommentMenu(null)
                                                                    }}
                                                                    className="
                                                                        w-full
                                                                        flex
                                                                        items-center
                                                                        gap-2
                                                                        px-3
                                                                        py-2
                                                                        text-xs
                                                                        text-[#4E220F]
                                                                        hover:bg-[#D5CEA3]
                                                                        transition
                                                                    "
                                                                >
                                                                    <Trash2 size={14} />
                                                                    Delete
                                                                </button>

                                                            </div>
                                                        )}

                                                    </div>
                                                )}

                                            </div>

                                            {editCommentId === comment._id ? (

                                                <div className="mt-2">

                                                    <input
                                                        type="text"
                                                        value={editContent}
                                                        onChange={e =>
                                                            setEditContent(
                                                                e.target.value
                                                            )
                                                        }
                                                        maxLength={500}
                                                        disabled={editing}
                                                        autoFocus
                                                        className="
                                                            w-full
                                                            h-9
                                                            px-3
                                                            rounded-lg
                                                            border
                                                            border-[#D0B8A8]
                                                            bg-white
                                                            text-sm
                                                            text-[#4E220F]
                                                            placeholder:text-[#8B6F61]
                                                            outline-none
                                                            focus:border-[#9D6638]
                                                        "
                                                    />

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        mt-2
                                                    ">

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditCommentId(null)
                                                                setEditContent("")
                                                            }}
                                                            disabled={editing}
                                                            className="
                                                                px-3
                                                                h-8
                                                                rounded-full
                                                                border
                                                                border-[#D0B8A8]
                                                                text-xs
                                                                text-[#4E220F]
                                                                hover:bg-[#D5CEA3]
                                                                transition
                                                                disabled:opacity-50
                                                            "
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditComment(
                                                                    comment._id
                                                                )
                                                            }
                                                            disabled={
                                                                editing ||
                                                                !editContent.trim()
                                                            }
                                                            className="
                                                                px-3
                                                                h-8
                                                                rounded-full
                                                                bg-[#4E220F]
                                                                text-xs
                                                                text-[#F8EDE3]
                                                                hover:bg-[#3C2A21]
                                                                transition
                                                                disabled:opacity-50
                                                                disabled:cursor-not-allowed
                                                            "
                                                        >
                                                            {editing
                                                                ? "Saving..."
                                                                : "Save"}
                                                        </button>

                                                    </div>

                                                </div>

                                            ) : (

                                                <p className="
                                                    mt-1
                                                    text-sm
                                                    text-[#4A352C]
                                                    break-words
                                                ">
                                                    {comment.content}
                                                </p>

                                            )}

                                            <p className="
                                                mt-1
                                                text-[10px]
                                                text-[#8B6F61]
                                            ">
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        day: "numeric",
                                                        month: "short"
                                                    }
                                                )}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                    <form
                        onSubmit={handleAddComment}
                        className="
                            flex
                            items-center
                            gap-2
                            p-3
                            border-t
                            border-[#D0B8A8]
                        "
                    >

                        <input
                            type="text"
                            value={content}
                            onChange={e =>
                                setContent(e.target.value)
                            }
                            placeholder="Write a comment..."
                            maxLength={500}
                            disabled={adding}
                            className="
                                flex-1
                                h-10
                                px-3
                                rounded-full
                                border
                                border-[#D0B8A8]
                                bg-white
                                text-sm
                                text-[#4E220F]
                                placeholder:text-[#8B6F61]
                                outline-none
                                focus:border-[#9D6638]
                            "
                        />

                        <button
                            type="submit"
                            disabled={
                                adding ||
                                !content.trim()
                            }
                            className="
                                w-10
                                h-10
                                flex
                                items-center
                                justify-center
                                rounded-full
                                bg-[#4E220F]
                                text-[#F8EDE3]
                                hover:bg-[#3C2A21]
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            <Send size={17} />
                        </button>

                    </form>

                </div>

            )}

            {deleteCommentId && (
                <div className="
                    fixed
                    inset-0
                    z-[80]
                    flex
                    items-center
                    justify-center
                    bg-black/40
                    p-4
                ">

                    <div className="
                        flex
                        gap-2
                        bg-[#F8EDE3]
                        p-3
                        rounded-xl
                        border
                        border-[#D0B8A8]
                        shadow-xl
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                setDeleteCommentId(null)
                            }
                            className="
                                px-4
                                h-9
                                rounded-full
                                border
                                border-[#D0B8A8]
                                text-sm
                                text-[#4E220F]
                                hover:bg-[#D5CEA3]
                                transition
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={async () => {
                                await handleDeleteComment(
                                    deleteCommentId
                                )

                                setDeleteCommentId(null)
                            }}
                            className="
                                px-4
                                h-9
                                rounded-full
                                bg-[#4E220F]
                                text-sm
                                text-[#F8EDE3]
                                hover:bg-[#3C2A21]
                                transition
                            "
                        >
                            Delete
                        </button>

                    </div>

                </div>
            )}

        </div>
    )
}

export default CommentModal