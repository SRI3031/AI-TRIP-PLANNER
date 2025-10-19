import  React  from 'react'
import  ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/ui/Login/Login.jsx'
import Home from './components/ui/Login/Home.jsx'
import AboutUs from './components/ui/Login/AboutUs'
import ForgotPwd from './components/ui/Login/ForgotPwd'
import ResetPwd from './components/ui/Login/ResetPwd'
import Dashboard from './components/ui/Admin/Dashboard.jsx'
import UserDashboard from './components/ui/User/UserDashboard'
import TripDetails from './components/ui/Admin/TripDetails'
import PlannedTrips from './components/ui/Trip_planning/PlannedTrips'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router=createBrowserRouter([
  {
  path:'/',
  element:<App/>
  },
  {
  path:'/login',
  element:<Login/>
  },
   {
  path:'/home',
  element:<Home/>
  },
  {
  path:'/about',
  element:<AboutUs/>
  },
  {
  path:'/forgot',
  element:<ForgotPwd/>
  },
  {
  path:'/reset',
  element:<ResetPwd/>
  },
   {
  path:'/admin',
  element:<Dashboard/>
  },
  {
  path:'/user',
  element:<UserDashboard/>
  },
  
  {
  path:'/plan',
  element:<PlannedTrips/>
  },
   {
  path:'/trip',
  element:<TripDetails/>
  },
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
