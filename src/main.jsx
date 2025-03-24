import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import VendorDetail from './componenets/VendorDetail/VendorDetail.jsx'
import VendorTable from './VendorTable.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    {/* <VendorTable/> */}
  </BrowserRouter>
  
)
