import { ProceedToPaymentButton, ShippingSelector } from "@/features/checkout"
import { AddLocationModal, useUserLocations } from "@/features/users"
import { useState } from "react"

const PrepareOrder = () => {
  const [ isVisible, setIsVisible ] = useState(false)
  const { addLocation, userLocations } = useUserLocations()

  return(
    <div>
      <div>
        <h2>Información de envío</h2>
        <ShippingSelector userLocations={userLocations} />
        <button onClick={() => setIsVisible(true)}>Agregar nueva dirección</button>
      </div>
      <ProceedToPaymentButton />
      <AddLocationModal addLocation={addLocation} isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  )
}
export default PrepareOrder
