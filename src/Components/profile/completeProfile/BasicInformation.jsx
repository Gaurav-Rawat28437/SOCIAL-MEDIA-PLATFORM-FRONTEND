import React, { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import validator from "validator"

const BasicInformation = ({ userData, setUserData, setStep }) => {


    const today = new Date().toISOString().split("T")[0]
    const firstNameRef = useRef(null)

    useEffect(() => {
        firstNameRef.current?.focus()
    }, [])

     const handleContinue = () => {
    if (!userData.firstName?.trim()) {
      toast.error("First name is required")
      return
    }
    

    if (userData.firstName?.trim().length<2 || userData.firstName?.trim().length>15) {
      toast.error("First name should be in between 2 to 15")
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

    if (userData.dateOfBirth > today) {
        toast.error("Date of birth cannot be greater than today")
        return
    }
    
    setStep(2)
  }

    return (
        <div className="w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-[#3C2A21]">
                Basic Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                Tell us a little about yourself.
            </p>

            <div className="mt-6 space-y-5">

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#3C2A21]">
                        First Name
                    </label>

                    <input
                        ref={firstNameRef}
                        type="text"
                        value={userData.firstName || ""}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                firstName: e.target.value,
                            })
                        }
                        placeholder="Enter your first name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#9D6638]"
                    />
                </div>


                <div>
                    <label className="mb-2 block text-sm font-medium text-[#3C2A21]">
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={userData.lastName || ""}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                lastName: e.target.value,
                            })
                        }
                        placeholder="Enter your last name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#9D6638]"
                    />
                </div>


                <div>
                    <label className="mb-2 block text-sm font-medium text-[#3C2A21]">
                        Gender
                    </label>

                    <select
                        value={userData.gender || ""}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                gender: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#9D6638]"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-[#3C2A21]">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        value={userData.dateOfBirth || ""}
                        max={today}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                dateOfBirth: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#9D6638]"
                    />
                </div>

                <button
                    type="button"
                    onClick={() => handleContinue()}
                    className="w-full rounded-lg bg-[#3C2A21] px-4 py-3 font-medium text-white transition hover:bg-[#2f211a]"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default BasicInformation