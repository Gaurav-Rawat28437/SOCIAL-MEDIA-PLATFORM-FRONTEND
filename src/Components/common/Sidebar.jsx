import React, { useState } from "react"
import { Home, User, LogOut, MessageCircle, Bell } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { logout } from "../../services/authService"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { removeUserData } from "../../Utils/usersSlice"

function Sidebar() {

  const nav = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

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
      className={`
        fixed
        bottom-0
        left-0
        right-0
        lg:top-16
        lg:bottom-auto
        lg:right-auto
        ${expanded ? "lg:w-64" : "lg:w-20"}
        h-16
        lg:h-[calc(100vh-4rem)]
        border-t
        lg:border-t-0
        lg:border-r
        border-[#5A382A]
        bg-[#E5E5CB]
        p-2
        lg:p-3
        transition-all
        duration-300
        overflow-hidden
        flex
        flex-row
        lg:flex-col
        z-40
      `}
    >

      <div className="
        flex
        flex-1
        items-center
        justify-around
        lg:block
        lg:space-y-2
      ">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `w-full lg:w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 lg:py-3 rounded-xl font-semibold whitespace-nowrap 
              ${isActive || location.pathname === "/"
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <Home size={24} className="shrink-0" />
          {expanded && <span className="hidden lg:inline">Home</span>}
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `w-full lg:w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 lg:py-3 rounded-xl whitespace-nowrap ${isActive
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <div className="relative">
            <MessageCircle size={24} className="shrink-0" />

            {totalUnreadMessages > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                {totalUnreadMessages > 99 ? "99+" : totalUnreadMessages}
              </span>
            )}
          </div>

          {expanded && <span className="hidden lg:inline">Chat</span>}
        </NavLink>

        <NavLink
          to="/notification"
          className={({ isActive }) =>
            `w-full lg:w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 lg:py-3 rounded-xl whitespace-nowrap ${isActive
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <div className="relative">
            <Bell size={24} className="shrink-0" />

            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>

          {expanded && <span className="hidden lg:inline">Notifications</span>}
        </NavLink>

        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `w-full lg:w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 lg:py-3 rounded-xl whitespace-nowrap ${isActive
              ? "bg-[#3C2A21] text-[#D5CEA3]"
              : "text-[#1A120B]"
            }`
          }
        >
          <User size={24} className="shrink-0" />
          {expanded && <span className="hidden lg:inline">Profile</span>}
        </NavLink>

      </div>

      <button
        onClick={logoutHandler}
        type="button"
        className="
          lg:hidden
          flex
          items-center
          justify-center
          w-12
          h-12
          rounded-xl
          text-[#1A120B]
          shrink-0
        "
      >
        <LogOut size={24} className="shrink-0" />
      </button>

      <button
        onClick={logoutHandler}
        type="button"
        className="
          hidden
          lg:flex
          w-full
          items-center
          gap-3
          px-3
          py-3
          rounded-xl
          hover:bg-[#1A120B]
          hover:text-[#E5E5CB]
          text-[#1A120B]
          whitespace-nowrap
          mt-auto
        "
      >
        <LogOut size={24} className="shrink-0" />
        {expanded && <span>Logout</span>}
      </button>

    </aside>
  )
}

export default Sidebar