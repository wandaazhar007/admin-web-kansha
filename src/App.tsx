import './style/globals.scss';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from './pages/login/Login';
import Products from "./pages/products/Products";
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="sidebarContainer">
            <Sidebar />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/categories",
          element: <Products />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
