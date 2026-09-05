import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"
import { X, Image as ImageIcon, Trash2, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { createPost } from "../../services/postServices"
import { addPost } from "../../Utils/postsSlice"
import { addThought } from "../../Utils/thoughtsSlice"
import { useEffect } from "react"
import { uploadImage } from "../../services/cloudinaryService"
import { addFeedPost } from "../../Utils/feedSlice"

function CreatePostModal({ setShowCreatePost }) {

    const userData = useSelector(store => store.User?.data || {})

    const [content, setContent] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [tempImage, setTempImage] = useState("")
    const [loading, setLoading] = useState(false)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(1)

    const videoRef = useRef(null)

    const inputFocusRef = useRef(null)

useEffect(() => {
    
        inputFocusRef.current?.focus()
    
}, [])

    const dispatch = useDispatch()

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    const removeImage = () => {

        setImageFile(null)
        setTempImage("")

    }



    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!content.trim() && !imageFile) {
            toast.error("Write something or add an image")
            return
        }

        try {

            setLoading(true)

            let postUrl = ""

            if (imageFile) {
                postUrl = await uploadImage(imageFile)
            }

            const postData = {
                content: content.trim(),
                imgUrl: postUrl,
            }

            const response = await createPost(postData)

            if (response.success) {

                if (response.data?.imgUrl) {
                   
                    dispatch(addPost(response.data))
                    dispatch(addFeedPost(response.data))
                } else {
                    dispatch(addThought(response.data))
                }

                toast.success(
                    response.msg || "Posted successfully"
                )

                setShowCreatePost(false)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.response?.data?.message ||
                error.message ||
                "Unable to create post"
            )

        } finally {

            setLoading(false)

        }
    }


    const isVideo = imageFile?.type?.startsWith("video/")

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center border bg-black/50 p-4">

            <div className="bg-[#D5CEA3] w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">


                <div className="flex items-center justify-between px-5 py-4 border-b border-[#b99b88]">

                    <h2 className="text-xl font-semibold text-[#1A120B]">
                        Create Post
                    </h2>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setShowCreatePost(false)}
                        className="p-2 rounded-full hover:bg-[#E5E5CB] text-[#1A120B] transition"
                    >
                        <X size={22} />
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="p-5">

                        <div className="flex items-center gap-3 mb-5">

                            <img
                                src={
                                    userData.displayPicture ||
                                    "/muuv_pfp_dark.svg"
                                }
                                alt="Profile"
                                className="w-11 h-11 rounded-full object-cover border border-[#D0B8A8]"
                            />

                            <div>

                                <p className="font-semibold text-[#1A120B]">
                                    {userData.firstName} {userData.lastName}
                                </p>

                                <p className="text-sm text-[#5c4437]">
                                    @{userData.username}
                                </p>

                            </div>

                        </div>


                        <textarea
                            ref={inputFocusRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={500}
                            rows={5}
                            placeholder="What's happening?"
                            className="
                                w-full
                                resize-none
                                outline-none
                                text-[#1A120B]
                                placeholder-[#6b513e]
                                text-lg
                            "
                        />

                        <div className="text-right text-xs text-[#362516]">
                            {content.length}/500
                        </div>



                        {tempImage && (

                            <div className="relative mt-4">

                                {isVideo ?
                                    (


                                        <div className="relative overflow-hidden rounded-xl border border-[#D0B8A8] bg-[#1A120B]">

                                            <video
                                                ref={videoRef}
                                                src={tempImage}
                                                playsInline
                                                onClick={() => {
                                                    if (videoRef.current.paused) {
                                                        videoRef.current.play()
                                                    } else {
                                                        videoRef.current.pause()
                                                    }
                                                }}
                                                onPlay={() => setIsPlaying(true)}
                                                onPause={() => setIsPlaying(false)}
                                                onEnded={() => setIsPlaying(false)}
                                                className="w-full max-h-80 object-contain cursor-pointer"
                                            />

                                            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3 bg-black/70">

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (videoRef.current.paused) {
                                                            videoRef.current.play()
                                                        } else {
                                                            videoRef.current.pause()
                                                        }
                                                    }}
                                                    className="text-white hover:text-[#D0B8A8] transition"
                                                >
                                                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        videoRef.current.muted = !videoRef.current.muted
                                                        setIsMuted(videoRef.current.muted)
                                                    }}
                                                    className="text-white hover:text-[#D0B8A8] transition"
                                                >
                                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                                </button>

                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={volume}
                                                    onChange={(e) => {
                                                        const value = Number(e.target.value)

                                                        setVolume(value)

                                                        videoRef.current.volume = value
                                                        videoRef.current.muted = value === 0
                                                        setIsMuted(value === 0)
                                                    }}
                                                    className="w-24 accent-[#8D493A]"
                                                />

                                            </div>

                                        </div>


                                    ) : (
                                        <img
                                            src={tempImage}
                                            alt="Post preview"
                                            className=" w-full max-h-80 object-cover rounded-xl border border-[#D0B8A8] "
                                        />
                                    )}

                                <button
                                    type="button"
                                    onClick={removeImage}
                                    disabled={loading}
                                    className="
                                        absolute
                                        top-2
                                        right-2
                                        p-2
                                        rounded-full
                                        bg-black/60
                                        text-white
                                        hover:bg-red-600
                                        transition
                                    "
                                >
                                    <Trash2 size={17} />
                                </button>

                            </div>

                        )}

                    </div>


                    <div className="px-5 py-4 border-t border-[#b99f8b] flex items-center justify-between">

                        <label
                            htmlFor="post-image"
                            className="
                                cursor-pointer
                                flex
                                items-center
                                gap-2
                                text-[#1A120B]
                                font-medium
                                hover:text-[#302119]
                                transition
                            "
                        >
                            <ImageIcon size={21} />

                            Add Image or Video

                            <input
                                disabled={loading}
                                id="post-image"
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={(e) => {
                                    

                                    const file = e.target.files[0]

                                    if (!file) return

                                    setImageFile(file)

                                    const tempUrl =
                                        URL.createObjectURL(file)

                                    setTempImage(tempUrl)

                                }}
                            />

                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                h-12
                                w-20
                                px-6
                                py-2.5
                                rounded-full
                                bg-[#1A120B]
                                text-white
                                font-semibold
                                hover:bg-[#E5E5CB]
                                hover:text-[#1A120B]
                                hover:border-[#1A120B]
                                hover:border
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                transition
                            "
                        >
                            {loading ? "Posting..." : "Post"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreatePostModal