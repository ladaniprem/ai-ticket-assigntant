import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import CheckAuth from './pages/checkauth.jsx'
import TicketDetails from './pages/ticket.jsx'
import Allticket from './pages/allticket.jsx'
import Login from './pages/login.jsx'
import Admin from './pages/admin.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <CheckAuth protected={true} >
          <Allticket />
        </CheckAuth>
      } />
    </Routes>
    <Routes>
      <Route path='/ticket/:id' element={
        <CheckAuth protected={true} >
          <TicketDetails />
        </CheckAuth>
      } />
    </Routes>
     <Routes>
      <Route path='/login' element={
        <CheckAuth protected={true} >
          <Login />
        </CheckAuth>
      } />
    </Routes>
     <Routes>
      <Route path='/signup' element={
        <CheckAuth protected={true} >
          <Login />
        </CheckAuth>
      } />
    </Routes>
      <Routes>
      <Route path='/admin' element={
        <CheckAuth protected={true} >
          <Admin />
        </CheckAuth>
      } />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
