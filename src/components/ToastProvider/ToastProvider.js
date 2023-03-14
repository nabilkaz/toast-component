import React from "react";


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
  React.useEffect(()=>{
    const dismissWithEscape =  ({key})=>{
      const EMPTY_STACK = toastStack.length === 0
      const NOT_ESCAPE = key !=='Escape'
      if(EMPTY_STACK || NOT_ESCAPE) return;
      setToastStack([])
    }
    window.addEventListener('keydown', dismissWithEscape)
    return(()=>{window.removeEventListener('keydown', dismissWithEscape)})
  }, [toastStack])

  return <ToastContext.Provider value={{VARIANT_OPTIONS, toastStack, setToastStack, dismissToast, createToast}}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
