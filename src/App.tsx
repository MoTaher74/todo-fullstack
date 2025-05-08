import { Toaster } from "react-hot-toast"
import router from "./router/routes"
import { RouterProvider } from "react-router-dom"


function App() {


  return (
  <main >
    <RouterProvider router={router} />
  <Toaster />
  </main>
  )
}

export default App
