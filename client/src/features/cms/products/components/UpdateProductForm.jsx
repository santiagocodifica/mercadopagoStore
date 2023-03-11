import { useState } from "react"
import { useUpdateProduct } from "../api/updateProduct"
import SizeInputs from "./SizeInputs"

const UpdateProductForm = ({ product }) => {
  const [name,setName] = useState(product.name)
  const [price,setPrice] = useState(product.price)
  const [description,setDescription] = useState(product.description)
  const [category, setCategory] = useState(product.category)
  const [sizes, setSizes] = useState(product.sizes)
  const { updateProduct } = useUpdateProduct()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProduct({ _id: product._id, name, price, description, category, sizes  })
  }

  return( product &&
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
export default UpdateProductForm
