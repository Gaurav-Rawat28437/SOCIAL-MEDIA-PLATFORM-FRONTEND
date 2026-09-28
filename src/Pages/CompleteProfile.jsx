import React, { useState } from "react"
import ProfileProgress from "../Components/profile/completeProfile/ProfileProgress"
import BasicInformation from "../Components/profile/completeProfile/BasicInformation"
import ProfileSetup from "../Components/profile/completeProfile/ProfileSetup"
import ReviewProfile from "../Components/profile/completeProfile/ReviewProfile"

function CompleteProfile() {
    const [step, setStep] = useState(1)

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        bio: "",
        displayPicture: ""
    })

    const [tempPicture, setTempPicture] = useState("/muuv_pfp_dark.svg")
    const [pictureFile, setPictureFile] = useState(null)

    return (
        <div className="min-h-screen bg-[#F8EDE3] flex items-center justify-center p-3 sm:p-5">

            <div className="w-full max-w-xl bg-white rounded-2xl p-5 sm:p-8 border border-[#D0B8A8]">

                <h1 className="text-2xl sm:text-3xl font-semibold text-[#4A352C] text-center mb-2">
                    Complete Your Profile
                </h1>

                <p className="text-sm sm:text-base text-center text-[#8B6F61] mb-6 sm:mb-8">
                    Tell us a little about yourself
                </p>

                <ProfileProgress step={step} />

                {step === 1 && (
                    <BasicInformation
                        userData={userData}
                        setUserData={setUserData}
                        setStep={setStep}
                    />
                )}

                {step === 2 && (
                    <ProfileSetup
                        userData={userData}
                        setUserData={setUserData}
                        setStep={setStep}
                        tempPicture={tempPicture}
                        setTempPicture={setTempPicture}
                        setPictureFile={setPictureFile}
                    />
                )}

                {step === 3 && (
                    <ReviewProfile
                        userData={userData}
                        setUserData={setUserData}
                        setStep={setStep}
                        tempPicture={tempPicture}
                        pictureFile={pictureFile}
                    />
                )}

            </div>

        </div>
    )
}

export default CompleteProfile