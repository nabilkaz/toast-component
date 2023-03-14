import React from "react";
import useKeyDown from "../../hooks/use-keydown";


export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];
  const [toastStack, setToastStack] = React.useState([])
  
  const dismissToast = (id)=>{
    const newToastStack = toastStack.filter((toast)=>toast.id !== id)
    setToastStack(newToastStack)
  }

  const createToast = (message, variant)=>{
    const newToastData = {id: Date.now(), message, variant}
    setToastStack([...toastStack, newToastData])
  }  
  
  const dismissWithEscape =  React.useCallback(({key})=>{
    setToastStack([])
  }, [])

  useKeyDown('Escape', dismissWithEscape)

  return <ToastContext.Provider value={{VARIANT_OPTIONS, toastStack, setToastStack, dismissToast, createToast}}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
