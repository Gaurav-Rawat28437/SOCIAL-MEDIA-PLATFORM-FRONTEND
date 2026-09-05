import axios from "axios"

export const uploadImage = async (file) => {

    const formData = new FormData()

    formData.append("file", file)
    formData.append(
        "upload_preset",
        "MUUV-socialMedia"
    )

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/auto/upload`,
        formData
    )

    const url = response.data?.secure_url

    if (!url) {
        throw new Error("Media upload failed")
    }

    return url
}