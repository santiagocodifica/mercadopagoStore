import { useEffect, useRef } from "react"
import { useRequiredForm } from "../../../hooks/useRequiredForm"

const AddLocationForm = (props) => {

  const { setInputs, error, checkValue } = useRequiredForm()
  const nameInput = useRef()
  const addressInput = useRef()
  const departmentInput = useRef()
  const cityInput = useRef()
  const postalCodeInput = useRef()

  useEffect(() => {
    setInputs([nameInput.current,addressInput.current,departmentInput.current,cityInput.current,postalCodeInput.current]) 
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(error.find(err => err.empty === true)){ return }
    props.addLocation(e.target)
    props.onSubmit && props.onSubmit()
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)} className="w-96 flex flex-col align-center">
      <label>Nombre:</label>
      <input 
        ref={nameInput} type="text" name="name"
        className={`border ${error[0] && error[0].error ? "border-red-400" : ""}`}
        onChange={(e) => checkValue(e)} onBlur={(e) => checkValue(e)}
      />
      <label>Dirección:</label>
      <input 
        ref={addressInput} type="text" name="address"
        className={`border ${error[1] && error[1].error ? "border-red-400" : ""}`}
        onChange={(e) => checkValue(e)} onBlur={(e) => checkValue(e)}
      />
      <label>Pais:</label>
      <select name="country">
        <option value={"Uruguay"}>Uruguay</option>
      </select>
      <label>Departamento:</label>
      <input 
        ref={departmentInput} type="text" name="department"
        className={`border ${error[2] && error[2].error ? "border-red-400" : ""}`}
        onChange={(e) => checkValue(e)} onBlur={(e) => checkValue(e)}
      />
      <label>Ciudad:</label>
      <input 
        ref={cityInput} type="text" name="city"
        className={`border ${error[3] && error[3].error ? "border-red-400" : ""}`}
        onChange={(e) => checkValue(e)} onBlur={(e) => checkValue(e)}
      />
      <label>Código Postal:</label>
      <input 
        ref={postalCodeInput} type="number" name="postalCode"
        className={`border ${error[4] && error[4].error ? "border-red-400" : ""}`}
        onChange={(e) => checkValue(e)} onBlur={(e) => checkValue(e)}
      />
      <label>Comentario:</label>
      <input className="border" type="text" name="comment" />
      <button>ADD</button>
    </form>
  )
}
export default AddLocationForm
