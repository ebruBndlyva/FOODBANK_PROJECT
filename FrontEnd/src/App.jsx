import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './App.css'
import "./responsive.css"
import ROUTES from "./Router/router"
const routers = createBrowserRouter(ROUTES)
function App() {


  return (
    
     
    <RouterProvider router={routers}/>
  )
}

export default App
