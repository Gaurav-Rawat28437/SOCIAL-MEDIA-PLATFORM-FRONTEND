const API_URL = import.meta.env.VITE_API_URL

export const sendOtp = async (email) => {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.msg || "Failed to send OTP")
  }

  return data
}

export const verifyOtp = async (email, otp) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      otp
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.msg || "Invalid OTP")
  }

  return data
}

export const registerUser = async (email, username, password) => {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      username,
      password
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.msg || "Failed to create account")
  }

  return data
}

export const loginUser = async (email, password, username) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      username
    })
  })
  

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.msg || "Login failed")
  }

  return data
}