import React from "react"
import { Home, Compass, Heart, User, Settings } from "lucide-react"

function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-[#D0B8A8] bg-[#F8EDE3] p-5">

      <div className="space-y-2">

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#DFD3C3] text-[#4A352C] font-semibold"
        >
          <Home size={20} />
          Home
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#8B6F61] hover:bg-[#DFD3C3] hover:text-[#4A352C] transition"
        >
          <Compass size={20} />
          Explore
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#8B6F61] hover:bg-[#DFD3C3] hover:text-[#4A352C] transition"
        >
          <Heart size={20} />
          Notifications
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#8B6F61] hover:bg-[#DFD3C3] hover:text-[#4A352C] transition"
        >
          <User size={20} />
          Profile
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#8B6F61] hover:bg-[#DFD3C3] hover:text-[#4A352C] transition"
        >
          <Settings size={20} />
          Settings
        </button>

      </div>

    </aside>
  )
}

export default Sidebar