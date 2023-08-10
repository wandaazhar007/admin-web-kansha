import './index.css';
import './style/globals.scss';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from './pages/login/Login';
import Products from "./pages/products/Products";
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { MenuProvider } from './context/ProductContext';
import Categories from './pages/categories/Categories';
import Users from './pages/users/Users';

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <MenuProvider>
          <Navbar />
          <div className="allContainer">
            <div className="sidebarContainer on">
              <Sidebar />
            </div>
            <div className="contentContainer">
              <Outlet />
            </div>
          </div>
          <Footer />
        </MenuProvider>
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
          element: <Categories />
        },
        {
          path: "/users",
          element: <Users />
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
