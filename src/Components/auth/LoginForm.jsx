import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import validator from "validator"
import { getUserData, loginUser } from "../../services/authService"
import { useDispatch } from "react-redux"
import { Eye, EyeOff } from "lucide-react"
import { addUserData } from "../../Utils/usersSlice"

function LoginForm() {
  const nav = useNavigate()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (loading) return

    try {
      setIdentifier("")
      setPassword("")
      setLoading(true)

      const isEmail = validator.isEmail(identifier)
    
      const response = await loginUser(
        isEmail ? identifier : "",
        password,
        isEmail ? "" : identifier
      )

      if (response.success) {
 
          dispatch(addUserData(response.data))
          toast.success("Login successful")
          nav("/home")
   
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-10">
      <div className="w-[420px]">

        <h2 className="text-3xl tracking-tight text-[#4A352C]">
          Welcome back
        </h2>

        <p className="text-sm text-[#86795F] mt-2 mb-8">
          New here?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#3C2A21] hover:underline"
          >
            Create an account
          </Link>
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-5">
            <label
              htmlFor="identifier"
              className="block font-mono tracking-widest text-xs text-[#86795F] mb-2"
            >
              EMAIL OR USERNAME
            </label>

            <input
              id="identifier"
              type="text"
              placeholder="you@muuv.app"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className=" w-full bg-[#E5E5CB] border border-[#EDE6CC] rounded-lg px-4 py-3 text-[#4E220F] outline-none focus:border-[#3C2A21] "
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block font-mono tracking-widest text-xs text-[#86795F] mb-2"
            >
              PASSWORD
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" w-full bg-[#E5E5CB] border border-[#EDE6CC] rounded-lg px-4 py-3 pr-12 text-[#4E220F] outline-none focus:border-[#3C2A21]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute right-3 top-1/2 -translate-y-1/2 z-10 text-[#86795F] hover:text-[#3C2A21] cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-7">
            <Link
              to="/"
              className="text-sm text-[#86795F] hover:text-[#9D6638]"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className=" w-full bg-[#1A120B] text-[#E5E5CB] py-3 rounded-lg font-semibold hover:bg-[#9D6638] disabled:bg-[#86795F] disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>



        <p className="text-xs text-[#86795F] text-center mt-8">
          By continuing you agree to Muuv&apos;s{" "}

          <a
            href="#"
            className="text-[#3C2A21] hover:underline"
          >
            Terms
          </a>

          {" "}and{" "}

          <a
            href="#"
            className="text-[#3C2A21] hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>

      </div>
    </div>
  )
}

export default LoginForm