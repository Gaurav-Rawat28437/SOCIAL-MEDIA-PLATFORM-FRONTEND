import React from 'react'
import LoginPage from './Pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import { Toaster } from "react-hot-toast"
import HomePage from './Pages/HomePage'
// import ProtectedRoutes from './services/ProtectedRoutes'


function App() {

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>



        {/* <Route  element={<ProtectedRoutes authentication={isLoggedIn} />}> */}
          < Route path="/home" element={<HomePage />} />

        {/* </Route> */}
      </Routes>

    </>
  )
}

export default App
