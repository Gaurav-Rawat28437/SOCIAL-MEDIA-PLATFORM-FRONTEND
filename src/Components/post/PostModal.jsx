import React, { useEffect, useRef, useState } from "react"
import {
    Heart,
    MessageCircle,
    X,
    MoreVertical,
    Bookmark,
    Share,
    Play,
    Volume2,
    Pause,
    VolumeX
} from "lucide-react"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { deletePost } from "../../services/postServices"
import { removePost, updateLike } from "../../Utils/postsSlice"
import EditPostModal from "./EditPostModal"
import { likePost, unlikePost } from "../../services/likeServices"


function PostModal({ post, userData, setSelectedPost }) {

    const dispatch = useDispatch()



    const [isShare, setShare] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(1)

    const videoRef = useRef(null)

    const togglePlay = () => {
        if (!videoRef.current) return

        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }


    const toggleMute = () => {
        if (!videoRef.current) return

        if (videoRef.current.muted || videoRef.current.volume === 0) {
            const newVolume = volume === 0 ? 1 : volume

            videoRef.current.volume = newVolume
            videoRef.current.muted = false
            setVolume(newVolume)
            setIsMuted(false)
        } else {
            videoRef.current.muted = true
            videoRef.current.volume = 0
            setVolume(0)
            setIsMuted(true)
        }
    }

    const handleVolume = (e) => {
        const value = Number(e.target.value)

        setVolume(value)

        if (videoRef.current) {
            videoRef.current.volume = value
            videoRef.current.muted = value === 0
            setIsMuted(value === 0)
        }
    }

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

    const [likeLoading, setLikeLoading] = useState(false)

    const handleLike = async () => {

        if (likeLoading) return

        try {
            setLikeLoading(true)

            const response = post.isLiked
                ? await unlikePost(post._id)
                : await likePost(post._id)

            if (response.success) {

                dispatch(
                    updateLike({
                        postId: post._id,
                        isLiked: !post.isLiked,
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
        }
        finally {

            setLikeLoading(false)
        }
    }

    const isVideo = post.imgUrl?.includes("/video/upload/")

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
                                onClick={() =>
                                    setShowOptions(!showOptions)
                                }
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

                {post.imgUrl && (
                    <div
                        className="
                        mt-4
                        h-[400px]
                        rounded-xl
                        overflow-hidden
                        border
                        border-[#1A120B]
                        bg-[#1A120B]
                        "
                    >

                        {isVideo ? (

                            <div className="relative w-full h-full">

                                <video
                                    ref={videoRef}
                                    src={post.imgUrl}
                                    playsInline
                                    onClick={togglePlay}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onEnded={() => setIsPlaying(false)}
                                    className="
                                    w-full
                                    h-full
                                    object-contain
                                    cursor-pointer
                                    "
                                />

                                {!isPlaying && (
                                    <button
                                        type="button"
                                        onClick={togglePlay}
                                        className="
                                        absolute
                                        left-1/2
                                        top-1/2
                                        -translate-x-1/2
                                        -translate-y-1/2
                                        w-14
                                        h-14
                                        rounded-full
                                        bg-black/60
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-black/80
                                        transition
                                        "
                                    >
                                        <Play
                                            size={27}
                                            className="ml-1"
                                        />
                                    </button>
                                )}

                                <div
                                    className="
                                    absolute
                                    bottom-0
                                    left-0
                                    right-0
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-3
                                    bg-black/70
                                    "
                                >

                                    <button
                                        type="button"
                                        onClick={togglePlay}
                                        className="
                                        text-white
                                        hover:text-[#D0B8A8]
                                        transition
                                        "
                                    >
                                        {isPlaying ? (
                                            <Pause size={20} />
                                        ) : (
                                            <Play size={20} />
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={toggleMute}
                                        className="
                                        text-white
                                        hover:text-[#D0B8A8]
                                        transition
                                        "
                                    >
                                        {isMuted ? (
                                            <VolumeX size={20} />
                                        ) : (
                                            <Volume2 size={20} />
                                        )}
                                    </button>

                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolume}
                                        className="
                                        w-24
                                        accent-[#8D493A]
                                        "
                                    />

                                </div>

                            </div>

                        ) : (

                            <img
                                src={post.imgUrl}
                                alt="Post"
                                className="
                                w-full
                                h-full
                                object-contain
                                "
                            />

                        )}

                    </div>
                )}

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

                    <div
                        className="
                    flex
                    items-center
                    justify-between
                    mt-4
                    pt-3
                    border-t
                    border-[#1A120B]
                    "
                    >

                        <button
                            type="button"
                            disabled={likeLoading}
                            onClick={() => handleLike()}
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
                               "
                        >
                            <Heart
                                size={20}
                                className="shrink-0 text-[#1A120B]"
                                fill={post.isLiked ? "currentColor" : "none"}
                            />

                            <span className="text-sm text-[#1A120B]">
                                {post.likesCount || 0}
                            </span>

                        </button>

                        <button
                            type="button"
                            className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        min-w-[70px]
                        h-10
                        px-3
                        rounded-full
                        text-[#1A120B]
                        border
                        border-transparent
                        hover:bg-[#D5CEA3]
                        hover:border-[#1A120B]
                        transition-all
                        "
                        >
                            <MessageCircle
                                size={20}
                                className="shrink-0"
                            />

                            <span className="text-sm">
                                {post.commentsCount || 0}
                            </span>

                        </button>

                        <button
                            type="button"
                            onClick={() => setShare(!isShare)}
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
                        "
                        >
                            <Share
                                size={20}
                                className="shrink-0 text-[#1A120B]"
                            />

                            <span className="text-sm text-[#1A120B]">
                                {post.repostsCount || 0}
                            </span>

                        </button>

                        <button
                            type="button"
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className="
                        w-10
                        h-10
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
                                size={20}
                                className="shrink-0 text-[#1A120B]"
                                fill={isBookmarked ? "#1A120B" : "none"}
                            />
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