import React from "react"
import { Plus, Search } from "lucide-react"

function Navbar() {
  return (
    <nav className="h-16 border-b border-[#D0B8A8] bg-[#F8EDE3] flex items-center justify-between px-6">

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-[#4A352C]">
          Muuv
        </h1>
      </div>

      <div className="flex items-center gap-4">

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

        <button
          type="button"
          className="w-10 h-10 rounded-full bg-[#2F211B] text-[#F8EDE3] flex items-center justify-center hover:bg-[#4A352C] transition"
        >
          <Plus size={21} />
        </button>

      </div>
    </nav>
  )
}

export default Navbar