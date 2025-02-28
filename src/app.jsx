import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global.css'
import TableUser from './tableUser/table-user'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TableUser/>
  </StrictMode>,
)
