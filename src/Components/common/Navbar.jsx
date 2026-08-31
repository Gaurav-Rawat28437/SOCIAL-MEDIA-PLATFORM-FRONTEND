import React, { useState } from "react"
import { Plus, Search } from "lucide-react"
import { useSelector } from "react-redux"
import CreatePostModal from "../post/CreatePostModal"

function Navbar() {

  const userData = useSelector(store => store.User?.data)

  const [showCreatePost, setShowCreatePost] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#D0B8A8] bg-white flex items-center px-6">

      <div className="flex items-center gap-3">
        <img
          className="h-15"
          src="/MUUV_logo.png"
          alt="MUUV-logo"
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">

        <div className="relative w-[320px]">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B6F61]"
          />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#DFD3C3] border border-[#D0B8A8] rounded-full pl-10 pr-4 py-2 text-sm text-[#4A352C] placeholder:text-[#8B6F61] outline-none focus:border-[#8B6F61] focus:bg-white"
          />

        </div>

      </div>

      <div className="ml-auto flex items-center gap-4">

        <button
          type="button"
          onClick={() => setShowCreatePost(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#9D6638] text-[#F8EDE3] font-semibold hover:bg-[#B0784A] transition"
        >
          <Plus size={19} />
          <span>Post</span>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#432A20] flex items-center justify-center text-[#F8EDE3] font-semibold">

          {userData?.displayPicture ? (

            <img
              src={userData.displayPicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />

          ) : (

            <span>
              {userData?.firstName?.[0]?.toUpperCase() || "U"}
            </span>

          )}

        </div>

      </div>

      {showCreatePost && (
        <CreatePostModal
          setShowCreatePost={setShowCreatePost}
        />
      )}

    </nav>
  )
}

export default Navbar