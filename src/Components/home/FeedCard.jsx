import React, { useRef, useState } from "react"
import {
    Heart,
    MessageCircle,
    Share,
    Bookmark,
    MoreHorizontal,
    Play,
    Pause,
    Volume2,
    VolumeX
} from "lucide-react"
import { useDispatch } from "react-redux"
import { likePost, unlikePost } from "../../services/likeServices"
import { updateFeedPostLike } from "../../Utils/feedSlice"
import toast from "react-hot-toast"
import { updateThoughtLike } from "../../Utils/thoughtsSlice"
import { updateLike } from "../../Utils/postsSlice"

function FeedCard({ post }) {

    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isShare, setShare] = useState(false)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(1)

    const videoRef = useRef(null)

    const author = post.authorId
    const isThought = !post.imgUrl
    const isVideo = post.imgUrl?.includes("/video/upload/")

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


    const dispatch = useDispatch()

    const [likeLoading, setLikeLoading] = useState(false)

    const handleLike = async () => {
        if (likeLoading) return

        try {

            setLikeLoading(true)

            const response = post.isLiked
                ? await unlikePost(post._id)
                : await likePost(post._id)

            if (response.success) {
                const isLiked = !post.isLiked

                dispatch(
                    updateFeedPostLike({
                        postId: post._id,
                        isLiked,
                        likesCount: response.likesCount
                    })
                )

                dispatch(
                    updateLike({
                        postId: post._id,
                        isLiked,
                        likesCount: response.likesCount
                    })
                )

                dispatch(
                    updateThoughtLike({
                        postId: post._id,
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
        }
        finally {

            setLikeLoading(false)
        }
    }

    return (
        <article
            className="
            bg-[#E5E5CB]
            border
            border-[#1A120B]
            rounded-2xl
            overflow-hidden
            shadow-[0_3px_12px_rgba(141,73,58,0.08)]
            hover:shadow-[0_7px_22px_rgba(141,73,58,0.14)]
            transition-all
            "
        >
            <div className="p-5">

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                            w-11
                            h-11
                            rounded-full
                            overflow-hidden
                            shrink-0
                            bg-[#D0B8A8]
                            border
                            border-[#1A120B]
                            cursor-pointer
                            "
                        >
                            <img
                                src={
                                    author?.displayPicture ||
                                    "/muuv_pfp_dark.svg"
                                }
                                alt="Profile"
                                className="
                                w-full
                                h-full
                                object-cover
                                "
                            />
                        </div>

                        <div>

                            <div className="flex items-center gap-2 flex-wrap">

                                <p
                                    className="
                                    font-semibold
                                    text-[#1A120B]
                                    "
                                >
                                    {author?.firstName}{" "}
                                    {author?.lastName}
                                </p>

                                <span
                                    className="
                                    text-sm
                                    text-[#1A120B]/60
                                    "
                                >
                                    @{author?.username}
                                </span>

                            </div>

                            <div
                                className="
                                flex
                                items-center
                                gap-1
                                text-xs
                                text-[#1A120B]/60
                                mt-0.5
                                "
                            >
                                <span>Muuv</span>
                                <span>·</span>

                                <span>
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            day: "numeric",
                                            month: "short"
                                        }
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="
                        w-9
                        h-9
                        flex
                        items-center
                        justify-center
                        rounded-full
                        text-[#1A120B]
                        border
                        border-transparent
                        hover:bg-[#D5CEA3]
                        hover:border-[#1A120B]
                        transition-all
                        "
                    >
                        <MoreHorizontal
                            size={20}
                            className="shrink-0"
                        />
                    </button>

                </div>

                {post.content && (
                    <p
                        className={`
                        mt-4
                        text-[#1A120B]
                        whitespace-pre-wrap
                        break-words
                        ${isThought
                                ? "text-[17px] leading-7"
                                : "text-[16px] leading-6"
                            }
                        `}
                    >
                        {post.content}
                    </p>
                )}

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

        </article>
    )
}

export default FeedCard