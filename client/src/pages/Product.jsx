import { useCartContext } from "@/features/cart"
import { AddToCartButton, SizeSelector, useCheckCart, useGetOneProduct, useProductStock } from "@/features/products"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Product = () => {

  const { id } = useParams()
  const { product } = useGetOneProduct(id)
  const { cart } = useCartContext()
  const { calculateQuantity, quantity } = useCheckCart()
  const { checkStock, isInStock } = useProductStock()
  const [ selectedSize, setSelectedSize ] = useState()
  const [ selectedSizeStock, setSelectedSizeStock ] = useState()

  useEffect(() => {
    selectedSize && calculateQuantity(id, selectedSize)
    selectedSize && checkStock(quantity, selectedSizeStock) // chequeamos el stock
  },[ selectedSize, quantity, cart ])

  const selectSize = (size, stock) => {
    setSelectedSize(size)
    setSelectedSizeStock(stock)
  }

  return( product &&
    <div>
      <h1>{ product.name }</h1> 
      <h3>{ product.price }</h3>
      <SizeSelector sizes={product.sizes} selectSize={selectSize} selectedSize={selectedSize} />
      <AddToCartButton isActive={isInStock} product={product} size={selectedSize} stock={selectedSizeStock} />
    </div>
  )
}
export default Product
