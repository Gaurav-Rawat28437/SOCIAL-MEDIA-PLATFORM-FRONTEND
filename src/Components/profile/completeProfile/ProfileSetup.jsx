import React from "react"

function ProfileSetup({ userData, setUserData, setStep, tempPicture,setTempPicture,setPictureFile }) { 
    
 
    return ( 
        <div> 
 
            <h2 className="text-2xl font-semibold text-[#4A352C] mb-6"> 
                Profile Setup 
            </h2> 
 
            <div className="space-y-4"> 
 
                <div> 
 
                    <label htmlFor="img" className="cursor-pointer block w-fit mx-auto"> 
                        <img 
                            className="h-30 w-30 rounded-full mx-auto border-2 border-[#D0B8A8] object-cover hover:border-[#9D6638] transition" 
                            src={tempPicture || "/muuv_pfp_dark.svg"} 
                            alt="Upload profile" 
                        /> 
 
                        <input 
                            id="img" 
                            type="file" 
                            accept="image/*" 
                            onChange={(e)=>{ 
                                const file=e.target.files[0] 
                                if (!file) return 
                                setPictureFile(file) 
                                const tempUrl=URL.createObjectURL(file) 
                                setTempPicture(tempUrl) 
 
                            }} 
                            name="displayPicture" 
                            className="hidden" 
                        /> 
                    </label>

                    {tempPicture && (
                        <button
                            type="button"
                            onClick={() => {
                                setPictureFile(null)
                                setTempPicture("")
                            }}
                            className="block mx-auto mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            Remove Picture
                        </button>
                    )}
 
                </div> 
 
                <div> 
                    <label className="block mb-1 text-[#4A352C]"> 
                        Bio 
                    </label> 
 
                    <textarea 
                        name="bio" 
                        value={userData.bio || ""} 
                        onChange={(e) => 
                            setUserData({ 
                                ...userData, 
                                bio: e.target.value 
                            }) 
                        } 
                        rows="4" 
                        placeholder="Tell us something about yourself..." 
                        className=" 
                            w-full 
                            border border-[#D0B8A8] 
                            rounded-xl 
                            px-4 py-3 
                            outline-none 
                            resize-none 
                            focus:border-[#9D6638] 
                        " 
                    /> 
                </div> 
 
            </div> 
 
            <div className="flex gap-3 mt-6"> 
 
                <button 
                    type="button" 
                    onClick={() => setStep(1)} 
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
                    onClick={() => { 
                        setStep(3) 
                    }} 
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
                    Continue 
                </button> 
 
            </div> 
 
        </div> 
    ) 
} 
 
export default ProfileSetup
