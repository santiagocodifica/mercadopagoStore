import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext()

export const cartReducer = (state, action) => {

  switch(action.type){
    case "SET": {
      const cart = [ ...action.payload ]
      localStorage.setItem("cart", JSON.stringify(cart))
      return { cart: cart }
    }
    case "CLEAR": {
      localStorage.removeItem("cart")
      return { cart : [] }
    }
    case "ADD": {
      const newItem = action.payload.product;
      newItem.quantity = 1
      newItem.size = action.payload.size
      newItem.stock = action.payload.stock
      localStorage.setItem("cart", JSON.stringify([ newItem, ...state.cart ]))
      return { cart: [ newItem, ...state.cart ]}
    }
    case "REMOVE": {
      const updatedCart = []
      state.cart.map(item => {
        if(item._id === action.payload._id && item.size === action.payload.size){ return }
        else{ updatedCart.push(item) }
      })
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return { cart: updatedCart }
    }
    case "PLUS": {
      const updatedCart = [ ...state.cart ]
      const indexToUpdate = updatedCart.findIndex(item => item._id === action.payload.product._id && item.size === action.payload.size)
      const updatedItem = { ...updatedCart[indexToUpdate] }
      if(updatedItem.quantity < action.payload.stock){
        updatedItem.quantity++
      }
      updatedCart[indexToUpdate] = updatedItem
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return { ...state, cart: updatedCart }
    }
    case "MINUS": {
      const updatedCart = [ ...state.cart ]
      const indexToUpdate = updatedCart.findIndex(item => item._id === action.payload.product._id && item.size === action.payload.size)
      const updatedItem = { ...updatedCart[indexToUpdate] }
      if(updatedItem.quantity >= 2){
        updatedItem.quantity--
      }
      updatedCart[indexToUpdate] = updatedItem
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return { ...state, cart: updatedCart }
    }
    default: return state
  }
}

export const CartContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(cartReducer, {
    cart: [],
  })

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"))
    if(cart){ dispatch({ type: "SET", payload: cart })}
  },[])

  return(
    <CartContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CartContext.Provider>
  )
}
