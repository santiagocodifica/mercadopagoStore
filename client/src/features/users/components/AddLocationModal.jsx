import AddLocationForm from "./AddLocationForm"

const AddLocationModal = (props) => {

  const handleSubmit = () => { props.setIsVisible(false) }

  return(
    <div className={`
      w-screen h-screen fixed ${ props.isVisible ? "top-0" : "top-[100vh]"}
      flex place-content-center place-items-center 
    `}>
      <div className="z-10 border p-4 rounded">
        <h2>Agregar nueva dirección:</h2>
        <AddLocationForm onSubmit={handleSubmit} addLocation={props.addLocation} />
      </div>
      <div onClick={() => props.setIsVisible(false)} className="bg-white opacity-75 absolute top-0 w-full h-full" />
    </div>
  )
}
export default AddLocationModal
