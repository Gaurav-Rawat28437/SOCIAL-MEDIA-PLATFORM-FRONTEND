import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"
import { X, Image as ImageIcon, Trash2 } from "lucide-react"
import { createPost } from "../../services/postServices"
import { addPost } from "../../Utils/postsSlice"
import { addThought } from "../../Utils/thoughtsSlice"
import { useEffect } from "react"
import { uploadImage } from "../../services/cloudinaryService"

function CreatePostModal({ setShowCreatePost }) {

    const userData = useSelector(store => store.User?.data || {})

    const [content, setContent] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [tempImage, setTempImage] = useState("")
    const [loading, setLoading] = useState(false)

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

            let imgUrl = ""

            if (imageFile) {
                imgUrl = await uploadImage(imageFile)
            }

            const postData = {
                content: content.trim(),
                imgUrl
            }

            const response = await createPost(postData)

            if (response.success) {

                if (response.data?.imgUrl) {
                    dispatch(addPost(response.data))
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

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">


                <div className="flex items-center justify-between px-5 py-4 border-b border-[#D0B8A8]">

                    <h2 className="text-xl font-semibold text-[#4A352C]">
                        Create Post
                    </h2>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setShowCreatePost(false)}
                        className="p-2 rounded-full hover:bg-[#F8EDE3] text-[#4A352C] transition"
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

                                <p className="font-semibold text-[#4A352C]">
                                    {userData.firstName} {userData.lastName}
                                </p>

                                <p className="text-sm text-[#8B6F61]">
                                    @{userData.username}
                                </p>

                            </div>

                        </div>


                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={500}
                            rows={5}
                            placeholder="What's happening?"
                            className="
                                w-full
                                resize-none
                                outline-none
                                text-[#4A352C]
                                placeholder-[#A99588]
                                text-lg
                            "
                        />

                        <div className="text-right text-xs text-[#8B6F61]">
                            {content.length}/500
                        </div>



                        {tempImage && (

                            <div className="relative mt-4">

                                <img
                                    src={tempImage}
                                    alt="Post preview"
                                    className="w-full max-h-80 object-cover rounded-xl border border-[#D0B8A8]"
                                />

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


                    <div className="px-5 py-4 border-t border-[#D0B8A8] flex items-center justify-between">

                        <label
                            htmlFor="post-image"
                            className="
                                cursor-pointer
                                flex
                                items-center
                                gap-2
                                text-[#9D6638]
                                font-medium
                                hover:text-[#3C2A21]
                                transition
                            "
                        >
                            <ImageIcon size={21} />

                            Add Image

                            <input
                                id="post-image"
                                type="file"
                                accept="image/*"
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
                                px-6
                                py-2.5
                                rounded-full
                                bg-[#3C2A21]
                                text-white
                                font-semibold
                                hover:bg-[#2F211A]
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