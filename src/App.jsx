
import { BrowserRouter, Route, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import About from './pages/About'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Admin from './pages/admin/Admin'
import './App.scss'
import Layout from './layouts/Layout'
import { ROUTE_PATHS } from './utils/constants'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn />} />
            <Route element= {<Layout />}>
              <Route path={ROUTE_PATHS.HOME} element={<Home />} />
              <Route path={ROUTE_PATHS.PRODUCTS} element={<Products />} />
              <Route path={ROUTE_PATHS.PRODUCT_DETAIL} element={<ProductDetail />} />
              <Route path={ROUTE_PATHS.REGISTER} element={<Register />} />
              <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
              <Route path={ROUTE_PATHS.BLOGS} element={<Blogs />} />
              <Route path={ROUTE_PATHS.BLOG_DETAIL} element={<BlogDetail />} />
              <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
              <Route path={ROUTE_PATHS.CART} element={<Cart />} />
              <Route path={ROUTE_PATHS.ORDERS} element={<Orders />} />
              <Route path={ROUTE_PATHS.PROFILE} element={<Profile />} />
              <Route path={ROUTE_PATHS.ADMIN} element={<Admin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default App
