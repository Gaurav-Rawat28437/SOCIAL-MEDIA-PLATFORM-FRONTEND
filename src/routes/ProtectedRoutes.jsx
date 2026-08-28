import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Components/common/Loading'
import { addUserData } from '../Utils/usersSlice'

function ProtectedRoutes() {

  const userData = useSelector(store => store.User?.data)
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (userData?.username) {
      setLoading(false)
      return
    }

    const getData = async () => {

      try {

        const res = await axios.get(import.meta.env.VITE_API_URL + "/auth/get-user-data",{  withCredentials: true})

        if (res.data.success) {
          dispatch(addUserData(res.data.data))
        }

      } catch (error) {

        nav("/login")

      } finally {

        setLoading(false)

      }
    }

    getData()

  }, [userData?.username, dispatch, nav])


  useEffect(() => {

    if (!loading &&userData?.username && !userData.isCompletedProfile) {
      nav("/complete-profile")
    }
    
    if(userData?.isCompletedProfile && location.pathname==="/complete-profile")
    {
      nav("/home")
    }
  

  }, [ loading, userData?.username, userData?.isCompletedProfile, nav])


  if (loading) {
    return <Loading />
  }

  return <Outlet />
}

export default ProtectedRoutes