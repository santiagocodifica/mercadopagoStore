import { useState } from "react"
import { useCreateProduct } from "../api/createProduct"
import SizeInputs from "./SizeInputs"

const NewProductForm = () => {

  const [name,setName] = useState("")
  const [price,setPrice] = useState(0)
  const [description,setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [sizes, setSizes] = useState([{ size: "m", stock: 5 }, { size: "l", stock: 10} ])
  const { createProduct } = useCreateProduct()

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct({ name, price, description, category, sizes })
  }
  return(
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Precio</label>
      <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <label>Descripción</label>
      <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <label>Categoría:</label>
      <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <br />
      <SizeInputs sizes={sizes} setSizes={setSizes} />
      <button type="button" onClick={() => setSizes(sizes => [ ...sizes, {size: "", stock: 0}])}>Añadir tamaño</button>
      <button type="button" onClick={() => setSizes(sizes => {
        const updated = [ ...sizes ]
        updated.pop()
        return updated
      })}>Remover tamaño</button>
      <br />
      <button>Guardar cambios</button>
    </form>
  )
}
export default NewProductForm
