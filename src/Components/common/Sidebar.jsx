import React from "react"
import { Home,User, LogOut, MessageCircle } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../../services/authService"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { removeUserData } from "../../Utils/usersSlice"

function Sidebar() {

  const nav = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try {
      await logout()
      toast.success("Logout successful")
      dispatch(removeUserData())
      nav("/login")
    } catch (error) {
      toast.error(error.response?.data?.msg || "Logout failed")
    }
  }

  return (
    <aside
      className="group fixed top-16 left-0 w-20 hover:w-64 h-[calc(100vh-4rem)] border-r border-[#5A382A] bg-[#E5E5CB] p-3 transition-all duration-300 overflow-hidden flex flex-col z-40"
    >

      <div className="space-y-2">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#1A120B] font-semibold transition whitespace-nowrap ${
              isActive
                ? "bg-[#3C2A21] text-[#D5CEA3] "
                : "text-[#1A120B]"
            }`
          }
        >
          <Home size={24} className="shrink-0 ml-1" />
          <span className="hidden group-hover:block">
            Home
          </span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#1A120B] transition whitespace-nowrap ${
              isActive
                ? "bg-[#3C2A21] text-[#D5CEA3] "
                : " text-[#1A120B]"
            }`
          }
        >
          <MessageCircle size={24} className="shrink-0 ml-1" />
          <span className="hidden group-hover:block">
            Chat
          </span>
        </NavLink>


        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#1A120B] transition whitespace-nowrap ${
              isActive
                ? " bg-[#3C2A21] text-[#D5CEA3] "
                : "text-[#1A120B]"
            }`
          }
        >
          <User size={24} className="shrink-0 ml-1" />
          <span className="hidden group-hover:block">
            Profile
          </span>
        </NavLink>

      </div>


      <button
        onClick={logoutHandler}
        type="button"
        className="
          w-full flex items-center gap-3
          px-3 py-3 rounded-xl
          hover:bg-[#1A120B]
          hover:text-[#E5E5CB]
          text-[#1A120B]
          transition whitespace-nowrap
          mt-auto
        "
      >
        <LogOut size={24} className="shrink-0" />

        <span className="hidden group-hover:block">
          Logout
        </span>
      </button>

    </aside>
  )
}

export default Sidebar