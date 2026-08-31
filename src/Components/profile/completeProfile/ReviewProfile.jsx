import React, { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { completeProfile } from "../../../services/profileService"
import { useNavigate } from "react-router-dom"
import { addUserData } from "../../../Utils/usersSlice"
import {uploadImage} from "../../../services/cloudinaryService"

function ReviewProfile({ userData, setUserData, setStep, tempPicture, pictureFile }) {

  const { username } = useSelector(store => store.User?.data)
  const [isImgUploading, setImgUploading] = useState(false)
  const nav = useNavigate()
  const dispatch = useDispatch()

  const submithandler = async () => {

    if (!userData.firstName?.trim()) {
      toast.error("First name is required")
      return
    }

    if (!userData.gender) {
      toast.error("Gender is required")
      return
    }

    if (!userData.dateOfBirth) {
      toast.error("Date of birth is required")
      return
    }

    try {

      setImgUploading(true)

      let displayPicture = userData.displayPicture || ""

      if (pictureFile && tempPicture) {

        displayPicture = await uploadImage(pictureFile)

        setUserData({
          ...userData,
          displayPicture
        })
      }

      const [year, month, day] = userData.dateOfBirth.split("-")
      const newDOB = `${day}/${month}/${year}`

      const finalUserData = {
        ...userData,
        displayPicture,
        dateOfBirth: newDOB
      }

      const response = await completeProfile(finalUserData)

      if (response.success) {
        dispatch(addUserData(response.data))
        nav("/home")
      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message || "Unable to complete profile"
      )

    } finally {

      setImgUploading(false)
    }
  }

  return (
    <div>

      <h2 className="text-2xl font-semibold text-[#4A352C] mb-6">
        Review Profile
      </h2>

      <div className="space-y-4">

        <div className="flex justify-center">

          <img
            src={tempPicture || "/muuv_pfp_dark.svg"}
            alt="Profile"
            className="h-30 w-30 rounded-full mx-auto border-2 border-[#D0B8A8] object-cover hover:border-[#9D6638] transition"
          />

        </div>

        <div className="bg-[#F8EDE3] rounded-xl p-4">

          <p className="text-sm text-[#8B6F61]">
            Name
          </p>

          <p className="font-semibold text-[#4A352C]">
            {userData.firstName} {userData.lastName}
          </p>

        </div>

        <div className="bg-[#F8EDE3] rounded-xl p-4">

          <p className="text-sm text-[#8B6F61]">
            Username
          </p>

          <p className="font-semibold text-[#4A352C]">
            @{username}
          </p>

        </div>

        <div className="bg-[#F8EDE3] rounded-xl p-4">

          <p className="text-sm text-[#8B6F61]">
            Gender
          </p>

          <p className="font-semibold text-[#4A352C]">
            {userData.gender}
          </p>

        </div>

        <div className="bg-[#F8EDE3] rounded-xl p-4">

          <p className="text-sm text-[#8B6F61]">
            Date of Birth
          </p>

          <p className="font-semibold text-[#4A352C]">
            @{userData.dateOfBirth}
          </p>

        </div>

        <div className="bg-[#F8EDE3] rounded-xl p-4">

          <p className="text-sm text-[#8B6F61]">
            Bio
          </p>

          <p className="text-[#4A352C]">
            {userData.bio || "No bio added"}
          </p>

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          type="button"
          onClick={() => setStep(2)}
          className="
            w-full
            border border-[#3C2A21]
            text-[#3C2A21]
            py-3
            rounded-xl
            font-semibold
            hover:bg-[#DFD3C3]
            transition
          "
        >
          Back
        </button>

        <button
          type="button"
          disabled={isImgUploading}
          onClick={() => submithandler()}
          className="
            w-full
            bg-[#3C2A21]
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-[#2f211a]
            transition
          "
        >
          {isImgUploading ? "Uploading" : "Complete Profile"}
        </button>

      </div>

    </div>
  )
}

export default ReviewProfile