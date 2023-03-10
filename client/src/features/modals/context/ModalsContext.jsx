import { createContext, useReducer } from "react";

export const ModalsContext = createContext()

export const modalsReducer = (state, action) => {
  switch(action.type){
    case "OPEN": {
      return { ...state, ...state[action.payload.modal].isOpen = true }
    }
    case "CLOSE": {
      return { ...state, ...state[action.payload.modal].isOpen = false }
    }
    default: return state
  }
}

export const ModalsContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(modalsReducer, {
    cartModal: { isOpen: false }
  })

  return(
    <ModalsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ModalsContext.Provider>
  )
}
