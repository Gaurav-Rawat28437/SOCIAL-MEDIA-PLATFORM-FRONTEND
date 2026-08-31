
export const completeProfile = async (userData) => {
  
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/profile/completeProfile`, userData, { withCredentials: true })
    return res.data
  
}


export const editProfile= async(updatedUserData)=>{
  const res=await axios.patch(
          `${import.meta.env.VITE_API_URL}/profile/update`,
          updatedUserData,
          {
            withCredentials: true
          }
        )

        return res.data
}
