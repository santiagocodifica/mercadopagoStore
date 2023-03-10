import { useEffect, useState } from "react"
import { useAuthContext } from "../../auth"

export const useGetCheckout = () => {

  const [ checkout, setCheckout ] = useState()
  const { user } = useAuthContext()
  
  useEffect(() => {
    const getCheckout = async () => {
      await fetch("/api/user/get_payment_data", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      })
      .then(response => response.json())
      .then(json => setCheckout(json))
      .catch(error => console.log(error))
    } 
    getCheckout()
  },[])

  return { checkout }
}
