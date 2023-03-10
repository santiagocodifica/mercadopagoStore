import { useAuthContext } from "@/features/auth"
import { useEffect, useState } from "react"

export const useUserLocations = () => {
  const [ userLocations, setUserLocations ] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const getLocations = () => {
      fetch(`/api/user/get_locations`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${user.token}`}
      })
      .then(response => response.json())
      .then(json => setUserLocations(json))
    }
    getLocations()
  },[])

  const addLocation = (form) => {
    fetch("/api/user/shipping_location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        shipping_location: {
          name: form.name.value,
          address: form.address.value,
          department: form.department.value,
          city: form.city.value,
          postal_code: form.postalCode.value,
          country: form.country.value,
          comment: form.comment.value
        }
      })
    })
    .then(response => response.json())
    .then(json => { setUserLocations(loc => [ ...loc, json ]) })
  }

  const deleteLocation = (location_id) => {
    fetch(`/api/user/delete_location/${location_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer: ${user.token}`
      }
    })
    .then(response => response.json())
    .then(() => { setUserLocations(userLocations.filter(location => location._id !== location_id)) })
    .catch(error => console.log(error))
  }

  return { userLocations, addLocation, deleteLocation }
}
