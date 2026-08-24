import React, { useEffect, useState } from "react"
import {
  registerUser,
  sendOtp,
  verifyOtp,
} from "../../services/authService"
import toast from "react-hot-toast"
import validator from "validator"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

function RegisterForm() {
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const nav = useNavigate()

  useEffect(() => {
    if (resendCooldown === 0) return

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  const handleSendOtp = async (e) => {
    e.preventDefault()

    if (loading) return

    try {
      setLoading(true)

      if(!validator.isEmail(email))
      {
        toast.error("Enter valid email")
        return
      }

      const response = await sendOtp(email)

      if (response.success) {
        toast.success("OTP sent to your email")

        setOtp("")
        setResendCooldown(60)
        setStep(2)
      }
    } catch (error) {
      console.error(error)

      const message =
        error.response?.data?.msg || "Something went wrong"

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()

    if (verifyLoading) return

    try {
      setVerifyLoading(true)

      if(isNaN(otp) || otp.length!==6){
        toast.error("Enter the valid 6-digit otp")
        return
      }

      const response = await verifyOtp(email, otp)

      if (response.success) {
        toast.success("Email verified successfully")
        setStep(3)
      }
    } catch (error) {
      console.error(error)

      const message =
        error.response?.data?.msg ||
        "Invalid OTP, please try again"

      toast.error(message)
    } finally {
      setVerifyLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendLoading || resendCooldown > 0) return

    try {
      setResendLoading(true)

      const response = await sendOtp(email)

      if (response.success) {
        toast.success("New OTP sent to your email")

        setOtp("")
        setResendCooldown(60)
      }
    } catch (error) {
      console.error(error)

      const message =
        error.response?.data?.msg || "Something went wrong"

      toast.error(message)
    } finally {
      setResendLoading(false)
    }
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault()

    if (loading) return

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      setLoading(true)

      const response = await registerUser(
        email,
        username,
        password
      )

      if (response.success) {
        toast.success("Account successfully created")
        nav("/login")
      }
    } catch (error) {
      console.error(error)

      const message =
        error.response?.data?.msg || "Something went wrong"

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-10">
      <div className="w-[420px]">


        {step === 1 && (
          <>
            <h2 className="text-3xl font-semibold tracking-tight text-[#4A352C]">
              Create your account
            </h2>

            <p className="text-sm text-[#8B6F61] mt-2 mb-8">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-[#4A352C] hover:underline"
              >
                Sign in
              </a>
            </p>

            <form onSubmit={handleSendOtp}>
              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs tracking-[0.06em] text-[#8B6F61]"
                >
                  EMAIL
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@muuv.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-[#DFD3C3] border border-[#D0B8A8] rounded-lg px-4 py-3 text-[#4A352C] placeholder:text-[#8B6F61] outline-none focus:border-[#8B6F61] focus:bg-white disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2F211B] text-[#F8EDE3] py-3 rounded-lg font-semibold transition-colors hover:bg-[#4A352C] disabled:bg-[#8B6F61] disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}


        {step === 2 && (
          <>
            <h2 className="text-3xl font-semibold tracking-tight text-[#4A352C]">
              Verify your email
            </h2>

            <p className="text-sm text-[#8B6F61] mt-2 mb-8">
              We sent a verification code to{" "}
              <span className="font-semibold text-[#4A352C]">
                {email}
              </span>
            </p>

            <form onSubmit={handleVerifyOtp}>
              <div className="mb-7">
                <label
                  htmlFor="otp"
                  className="block mb-2 text-xs tracking-[0.06em] text-[#8B6F61]"
                >
                  VERIFICATION CODE
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  required
                  disabled={verifyLoading}
                  className="w-full bg-[#DFD3C3] border border-[#D0B8A8] rounded-lg px-4 py-3 text-[#4A352C] placeholder:text-[#8B6F61] outline-none focus:border-[#8B6F61] focus:bg-white tracking-[0.15em] disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={verifyLoading}
                className="w-full bg-[#2F211B] text-[#F8EDE3] py-3 rounded-lg font-semibold transition-colors hover:bg-[#4A352C] disabled:bg-[#8B6F61] disabled:text-[#F8EDE3] disabled:cursor-not-allowed"
              >
                {verifyLoading
                  ? "Verifying..."
                  : "Verify Email"}
              </button>
            </form>

            <div className="flex justify-between mt-5 text-sm">
              <button
                type="button"
                onClick={() => {
                  if (!verifyLoading && !resendLoading) {
                    setStep(1)
                  }
                }}
                disabled={verifyLoading || resendLoading}
                className="text-[#8B6F61] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change email
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={
                  resendLoading ||
                  resendCooldown > 0 ||
                  verifyLoading
                }
                className="font-semibold text-[#4A352C] hover:text-[#8B6F61] hover:underline disabled:text-[#8B6F61] disabled:cursor-not-allowed"
              >
                {resendLoading
                  ? "Sending..."
                  : resendCooldown > 0
                    ? `Resend OTP in ${resendCooldown}s`
                    : "Resend OTP"}
              </button>
            </div>
          </>
        )}


        {step === 3 && (
          <>
            <h2 className="text-3xl font-semibold tracking-tight text-[#4A352C]">
              Complete your profile
            </h2>

            <p className="text-sm text-[#8B6F61] mt-2 mb-8">
              Your email has been verified. Finish setting up
              your account.
            </p>

            <form onSubmit={handleCreateAccount}>


              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-xs tracking-[0.06em] text-[#8B6F61]"
                >
                  USERNAME
                </label>

                <input
                  id="username"
                  type="text"
                  placeholder="yourusername"
                  autoComplete="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                  disabled={loading}
                  className="w-full bg-[#DFD3C3] border border-[#D0B8A8] rounded-lg px-4 py-3 text-[#4A352C] placeholder:text-[#8B6F61] outline-none focus:border-[#8B6F61] focus:bg-white disabled:opacity-60"
                />
              </div>


              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-xs tracking-[0.06em] text-[#8B6F61]"
                >
                  PASSWORD
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    disabled={loading}
                    className="w-full bg-[#DFD3C3] border border-[#D0B8A8] rounded-lg px-4 py-3 pr-16 text-[#4A352C] placeholder:text-[#8B6F61] outline-none focus:border-[#8B6F61] focus:bg-white disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B6F61] hover:text-[#4A352C] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>


              <div className="mb-7">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-xs tracking-[0.06em] text-[#8B6F61]"
                >
                  CONFIRM PASSWORD
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    disabled={loading}
                    className="w-full bg-[#DFD3C3] border border-[#D0B8A8] rounded-lg px-4 py-3 pr-16 text-[#4A352C] placeholder:text-[#8B6F61] outline-none focus:border-[#8B6F61] focus:bg-white disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B6F61] hover:text-[#4A352C] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2F211B] text-[#F8EDE3] py-3 rounded-lg font-semibold transition-colors hover:bg-[#4A352C] disabled:bg-[#8B6F61] disabled:text-[#F8EDE3] disabled:cursor-not-allowed"
              >
                {loading
                  ? "Creating..."
                  : "Create account"}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  )
}

export default RegisterForm