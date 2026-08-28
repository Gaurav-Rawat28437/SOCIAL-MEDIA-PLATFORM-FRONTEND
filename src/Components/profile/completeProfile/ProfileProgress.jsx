import React from "react"

function ProfileProgress({ step }) {
  return (
    <div className="flex items-center justify-center mb-8">

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
          step >= 1
            ? "bg-[#9D6638] text-white"
            : "bg-[#D0B8A8] text-[#4A352C]"
        }`}
      >
        1
      </div>

      <div
        className={`w-16 h-1 ${
          step >= 2 ? "bg-[#9D6638]" : "bg-[#D0B8A8]"
        }`}
      />

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
          step >= 2
            ? "bg-[#9D6638] text-white"
            : "bg-[#D0B8A8] text-[#4A352C]"
        }`}
      >
        2
      </div>

      <div
        className={`w-16 h-1 ${
          step >= 3 ? "bg-[#9D6638]" : "bg-[#D0B8A8]"
        }`}
      />

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
          step >= 3
            ? "bg-[#9D6638] text-white"
            : "bg-[#D0B8A8] text-[#4A352C]"
        }`}
      >
        3
      </div>

    </div>
  )
}

export default ProfileProgress