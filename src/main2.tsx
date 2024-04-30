import React from 'react'
import ReactDOM from 'react-dom/client'
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { VITE_define_t } from "../VITE_define"
declare global {
  interface Window {
    VITE_define: VITE_define_t;
  }
}
const useStore = create<{}>()(immer<{}>((selfEr, setEr) => {
  return {}
}))
const App = () => <>{JSON.stringify(window.VITE_define)}</>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
