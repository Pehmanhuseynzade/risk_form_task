import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/ROUTES";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
        <RouterProvider router = {routes}/>
    </>
  )
}

export default App