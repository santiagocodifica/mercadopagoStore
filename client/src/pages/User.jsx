import { useState } from "react"
import { AddLocationModal, useGetUserOrders, useUserLocations } from "@/features/users"
import { useAuthContext } from "@/features/auth"

const User = () => {

  const { user } = useAuthContext()
  const { userLocations, addLocation, deleteLocation } = useUserLocations()
  const [ isVisible, setIsVisible ] = useState(false)
  const { userOrders } = useGetUserOrders()

  return( user &&
    <div className="p-4 mt-10">
      <h1 className="text-2xl mb-4">Hola { user.username }</h1>
      { userLocations &&  
        <div>
          <h2>Mis direcciones:</h2>
          <ul>
            { userLocations.map(location => {
              return <li key={location._id}>
                <h3>{ location.name }</h3>
                <p>
                  { location.address }<br />
                  { location.department }, { location.city }<br/>
                </p>
                <button onClick={() => deleteLocation(location._id)}>Borrar esta dirección</button>
              </li>
            })}
          </ul>
          <button onClick={() => setIsVisible(true)}>Añadir dirección</button>
          { isVisible && <AddLocationModal addLocation={addLocation} isVisible={isVisible} setIsVisible={setIsVisible} />}
        </div> 
      }
      { userOrders &&
        <div>
          <h1>Pedidos:</h1>
          <ul>
            { userOrders.map(order => { return(
              <li key={order._id} className="py-2 border-b">
                <span>Estado: { order.status }</span>
                <div>
                  { order.products.map((product, index) => { return(
                    <p key={index}>{ product.quantity } { product.name } Talle: { product.size }</p>
                  )})}
                </div>
              </li>
            )})}
          </ul>
        </div>
      }      
    </div>
  )
}
export default User
