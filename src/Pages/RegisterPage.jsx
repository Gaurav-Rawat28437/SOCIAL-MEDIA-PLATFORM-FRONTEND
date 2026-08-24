import React from 'react'
import RegisterForm from '../Components/auth/RegisterForm'
import BrandSide from '../Components/auth/BrandSide'

function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-[#F8EDE3]">
      <BrandSide />
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
