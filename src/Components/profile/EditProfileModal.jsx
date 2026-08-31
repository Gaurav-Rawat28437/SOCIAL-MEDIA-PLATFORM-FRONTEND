import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { X, Trash2 } from "lucide-react"
import { uploadImage } from "../../services/cloudinaryService"
import { addUserData } from "../../Utils/usersSlice"
import { editProfile } from "../../services/profileService"
import { useEffect } from "react"

function EditProfileModal({ setShowEdit }) {

    const userData = useSelector(store => store.User?.data || {})
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState(userData.firstName || "")
    const [lastName, setLastName] = useState(userData.lastName || "")
    const [username, setUsername] = useState(userData.username || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [gender, setGender] = useState(userData.gender || "")

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    const [displayPicture, setDisplayPicture] = useState(
        userData.displayPicture || ""
    )

    const [coverPicture, setCoverPicture] = useState(
        userData.coverPicture || ""
    )

    const [pictureFile, setPictureFile] = useState(null)
    const [coverFile, setCoverFile] = useState(null)

    const [tempPicture, setTempPicture] = useState(
        userData.displayPicture || ""
    )

    const [tempCoverPicture, setTempCoverPicture] = useState(
        userData.coverPicture || ""
    )

    const [loading, setLoading] = useState(false)

    const [removePicture, setRemovePicture] = useState(false)
    const [removeCoverPicture, setRemoveCoverPicture] = useState(false)

    const handleProfilePictureChange = (e) => {

        const file = e.target.files[0]

        if (!file) return

        setPictureFile(file)
        setRemovePicture(false)

        const tempUrl = URL.createObjectURL(file)
        setTempPicture(tempUrl)
    }

    const handleCoverPictureChange = (e) => {

        const file = e.target.files[0]

        if (!file) return

        setCoverFile(file)
        setRemoveCoverPicture(false)

        const tempUrl = URL.createObjectURL(file)
        setTempCoverPicture(tempUrl)
    }

    const handleRemovePicture = () => {

        setPictureFile(null)
        setDisplayPicture("")
        setTempPicture("")
        setRemovePicture(true)
    }

    const handleRemoveCoverPicture = () => {

        setCoverFile(null)
        setCoverPicture("")
        setTempCoverPicture("")
        setRemoveCoverPicture(true)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!firstName.trim()) {
            toast.error("First name is required")
            return
        }

        if (!username.trim()) {
            toast.error("Username is required")
            return
        }

        if (username.length > 12) {
            toast.error("Username cannot be more than 12 characters")
            return
        }

        try {

            setLoading(true)

            let finalDisplayPicture = displayPicture
            let finalCoverPicture = coverPicture


            const uploads = []

            if (pictureFile) {

                uploads.push(
                    uploadImage(pictureFile).then(url => {
                        finalDisplayPicture = url
                    })
                )

            }

            if (coverFile) {

                uploads.push(
                    uploadImage(coverFile).then(url => {
                        finalCoverPicture = url
                    })
                )

            }

            await Promise.all(uploads)

            if (removePicture) {
                finalDisplayPicture = ""
            }

            if (removeCoverPicture) {
                finalCoverPicture = ""
            }

            const updatedUserData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                username: username.trim(),
                bio: bio.trim(),
                gender,
                displayPicture: finalDisplayPicture,
                coverPicture: finalCoverPicture
            }

            const response = await editProfile(updatedUserData)

            if (response.success) {

                dispatch(addUserData(response.data))

                toast.success(
                    response.msg || "Profile updated successfully"
                )

                setShowEdit(false)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.msg ||
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            )

        } finally {

            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">

                <div className="sticky top-0 z-10 bg-white border-b border-[#D0B8A8] px-6 py-4 flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-semibold text-[#4A352C]">
                            Edit Profile
                        </h2>

                        <p className="text-sm text-[#8B6F61]">
                            Update your profile information
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowEdit(false)}
                        disabled={loading}
                        className="p-2 rounded-full text-[#4A352C] hover:bg-[#F8EDE3] transition"
                    >
                        <X size={22} />
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="relative">

                        <div className="relative group">

                            <img
                                src={tempCoverPicture || "/muuv_display_picture.svg"}
                                alt="Cover"
                                className={`w-full h-48 md:h-56 ${tempCoverPicture ? "object-cover" : "object-contain"
                                    } bg-[#DFD3C3]`}
                            />

                            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 group-hover:opacity-100 transition">

                                <label
                                    htmlFor="cover-img"
                                    className="cursor-pointer bg-[#3C2A21] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2F211A]"
                                >
                                    Change Cover Picture
                                </label>

                                {tempCoverPicture && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveCoverPicture}
                                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                                    >
                                        <Trash2 size={16} />
                                        Remove
                                    </button>
                                )}

                            </div>

                        </div>

                        <input
                            id="cover-img"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverPictureChange}
                        />

                        <div className="absolute left-6 -bottom-14 group">

                            <img
                                src={tempPicture || "/muuv_pfp_dark.svg"}
                                alt="Profile"
                                className="h-28 w-28 rounded-full object-cover border-4 border-white bg-[#DFD3C3] group-hover:brightness-75 transition"
                            />

                            <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 group-hover:opacity-100 transition">

                                <label
                                    htmlFor="profile-img"
                                    className="cursor-pointer text-white text-xs font-semibold"
                                >
                                    Change
                                </label>

                                {tempPicture && (
                                    <button
                                        type="button"
                                        onClick={handleRemovePicture}
                                        className="text-white text-xs font-semibold hover:text-red-300"
                                    >
                                        Remove
                                    </button>
                                )}

                            </div>

                        </div>

                        <input
                            id="profile-img"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureChange}
                        />

                    </div>

                    <div className="p-6 pt-20 space-y-5">

                        <div>

                            <label className="block mb-2 text-sm font-medium text-[#4A352C]">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border border-[#D0B8A8] rounded-xl px-4 py-3 text-[#4A352C] outline-none focus:border-[#9D6638] focus:ring-1 focus:ring-[#9D6638]"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-[#4A352C]">
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border border-[#D0B8A8] rounded-xl px-4 py-3 text-[#4A352C] outline-none focus:border-[#9D6638] focus:ring-1 focus:ring-[#9D6638]"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-[#4A352C]">
                                Username
                            </label>

                            <input
                                type="text"
                                value={username}
                                maxLength={12}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border border-[#D0B8A8] rounded-xl px-4 py-3 text-[#4A352C] outline-none focus:border-[#9D6638] focus:ring-1 focus:ring-[#9D6638]"
                            />

                            <p className="text-xs text-[#8B6F61] mt-1">
                                {username.length}/12
                            </p>

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-[#4A352C]">
                                Bio
                            </label>

                            <textarea
                                value={bio}
                                maxLength={150}
                                rows={4}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full border border-[#D0B8A8] rounded-xl px-4 py-3 text-[#4A352C] outline-none focus:border-[#9D6638] focus:ring-1 focus:ring-[#9D6638] resize-none"
                            />

                            <p className="text-xs text-[#8B6F61] mt-1 text-right">
                                {bio.length}/150
                            </p>

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-[#4A352C]">
                                Gender
                            </label>

                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full border border-[#D0B8A8] rounded-xl px-4 py-3 text-[#4A352C] outline-none focus:border-[#9D6638] focus:ring-1 focus:ring-[#9D6638] bg-white"
                            >

                                <option value="">
                                    Select gender
                                </option>

                                <option value="male">
                                    Male
                                </option>

                                <option value="female">
                                    Female
                                </option>

                                <option value="other">
                                    Other
                                </option>

                            </select>

                        </div>

                        <div className="flex gap-3 pt-2">

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => setShowEdit(false)}
                                className="px-5 py-3 rounded-xl border border-[#D0B8A8] text-[#4A352C] font-medium hover:bg-[#F8EDE3] transition disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-5 py-3 rounded-xl bg-[#3C2A21] text-white font-semibold hover:bg-[#2F211A] disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EditProfileModal
