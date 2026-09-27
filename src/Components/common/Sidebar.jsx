import React, { useState } from "react"
import { Home, User, LogOut, MessageCircle, Bell } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../../services/authService"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { removeUserData } from "../../Utils/usersSlice"

function Sidebar() {

  const nav = useNavigate()
  const dispatch = useDispatch()

  const totalUnreadMessages = useSelector(store => store.globalData.totalUnreadMessages)
  const unreadCount = useSelector(store => store.notification?.unreadCount)

  const [expanded, setExpanded] = useState(
    sessionStorage.getItem("sidebarExpanded") === "true"
  )

  const handleMouseEnter = () => {
    setExpanded(true)
    sessionStorage.setItem("sidebarExpanded", "true")
  }

  const handleMouseLeave = () => {
    setExpanded(false)
    sessionStorage.setItem("sidebarExpanded", "false")
  }

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-16 left-0 ${expanded ? "w-64" : "w-20"
        } h-[calc(100vh-4rem)] border-r border-[#5A382A] bg-[#E5E5CB] p-3 transition-all duration-300 overflow-hidden flex flex-col z-40`}
    >

      <div className="space-y-2">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold whitespace-nowrap ${isActive
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <Home size={24} className="shrink-0 ml-1" />
          {expanded && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-xl whitespace-nowrap ${isActive
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <div className="relative">
            <MessageCircle size={24} className="shrink-0 ml-1" />

            {totalUnreadMessages > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                {totalUnreadMessages > 99 ? "99+" : totalUnreadMessages}
              </span>
            )}
          </div>

          {expanded && <span>Chat</span>}
        </NavLink>

        <NavLink
          to="/notification"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-xl whitespace-nowrap ${isActive
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <div className="relative">
            <Bell size={24} className="shrink-0 ml-1" />

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>

          {expanded && <span>Notifications</span>}
        </NavLink>

        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-xl whitespace-nowrap ${isActive
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <User size={24} className="shrink-0 ml-1" />
          {expanded && <span>Profile</span>}
        </NavLink>

      </div>

      <button
        onClick={logoutHandler}
        type="button"
        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#1A120B] hover:text-[#E5E5CB] text-[#1A120B] whitespace-nowrap mt-auto"
      >
        <LogOut size={24} className="shrink-0" />
        {expanded && <span>Logout</span>}
      </button>

    </aside>
  )
}

export default Sidebar