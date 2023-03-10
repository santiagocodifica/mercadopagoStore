import { useEffect, useState } from "react"

export const useShippingLocation = () => {
  const [ shippingLocation, setShippingLocation ] = useState()

  useEffect(() => {
    const location = localStorage.getItem("shipping_location")
    if(location){ setShippingLocation(JSON.parse(location)) }
    else{ setShippingLocation()}
  },[])

  const selectShippingLocation = (location) => {
    setShippingLocation(location)
    localStorage.setItem("shipping_location", JSON.stringify(location))
  }

  return { shippingLocation, selectShippingLocation }
}
