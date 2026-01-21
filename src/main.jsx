import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider,Route} from 'react-router-dom'
import Layout from '../Layout/Layout'
import Register from '../components/Register'
import HomePage from '../HomePage/HomePage'
import Login from '../components/Login'
import AboutPage from '../components/AboutPage'
const router=createBrowserRouter(createRoutesFromElements(
  <>
  <Route path='/' element={<Layout/>}>
   <Route index element={<HomePage />} />
   <Route path='/register' element={<Register/>}></Route>
   <Route path='/login' element={<Login/>}></Route>
   <Route path='/about' element={<AboutPage/>}></Route>
  </Route>
  </>
))
createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router={router}/>
  </>
)
