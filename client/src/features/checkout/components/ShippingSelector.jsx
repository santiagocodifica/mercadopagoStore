import { useShippingLocation } from "../hooks/useShippingLocation"

const ShippingSelector = (props) => {

  const { shippingLocation, selectShippingLocation } = useShippingLocation()

  return( props.userLocations &&
    <ul className="flex">
      {props.userLocations.map(location => { return(
        <li
          key={ location._id }
          onClick={() => selectShippingLocation(location)}
          className={`
            p-2 border hover:bg-gray-100 hover:text-black cursor-pointer
            ${shippingLocation && shippingLocation._id === location._id && "bg-black text-white"}
          `}
        >{ location.name }</li>
      )})}
    </ul>
  )
}
export default ShippingSelector 
