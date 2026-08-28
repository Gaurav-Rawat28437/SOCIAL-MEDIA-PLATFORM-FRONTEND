import BrandSide from "../Components/auth/BrandSide"
import LoginForm from "../Components/auth/LoginForm"

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#F8EDE3] flex">
      <BrandSide />
      <LoginForm />
    </div>
  )
}

export default LoginPage