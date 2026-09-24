import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from './routes/ProtectedRoutes'

const LoginPage = lazy(() => import('./Pages/LoginPage'))
const RegisterPage = lazy(() => import('./Pages/RegisterPage'))
const HomePage = lazy(() => import('./Pages/HomePage'))
const ProfilePage = lazy(() => import('./Pages/ProfilePage'))
const CompleteProfile = lazy(() => import('./Pages/CompleteProfile'))
const OtherUserProfilePage = lazy(() => import('./Pages/OtherUserProfilePage'))
const ChatPage = lazy(() => import('./Pages/ChatPage'))

function App() {

  return (
    <>
      <Toaster />

      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >

        <Routes>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoutes />}>

            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/profile/:userId" element={<OtherUserProfilePage />} />
            <Route path="/chat" element={<ChatPage />} />

          </Route>

          <Route path="*" element={<LoginPage />} />

        </Routes>

      </Suspense>
    </>
  )
}

export default App