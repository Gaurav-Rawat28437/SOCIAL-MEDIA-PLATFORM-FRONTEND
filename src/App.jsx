import React from 'react'
import LoginPage from './Pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import { Toaster } from "react-hot-toast"
import HomePage from './Pages/HomePage'
import ProtectedRoutes from './routes/ProtectedRoutes'
import ProfilePage from './Pages/ProfilePage'
import CompleteProfile from './Pages/CompleteProfile'




function App() {

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>



        <Route  element={<ProtectedRoutes/>}>

          <Route path="/" element={<HomePage />}></Route>
          < Route path="/home" element={<HomePage />} />
          < Route path="/profile" element={<ProfilePage />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />

        </Route>

        <Route path="*" element={<LoginPage/>}></Route>
      </Routes>

    </>
  )
}

export default App
