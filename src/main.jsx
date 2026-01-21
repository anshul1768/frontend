import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider,Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import Register from './components/Register'
import HomePage from './HomePage/HomePage'
import Login from './components/Login'
import AboutPage from './components/AboutPage'
import ProtectedLayout from './Protected/ProtectedLayout'
const router=createBrowserRouter(createRoutesFromElements(
   <>
      {/* ✅ Public Routes (No protection) */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* ✅ Protected Routes (Home + About + Layout) */}
      <Route element={<ProtectedLayout/>}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Route>
    </>
))
createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router={router}/>
  </>
)
