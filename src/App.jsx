
import { BrowserRouter, Route, Routes } from 'react-router'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Library from './pages/Library'
import Profile from './pages/Profile'
import './App.scss'
import Layout from './layouts/Layout'
import { ROUTE_PATHS } from './utils/constants'

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTE_PATHS.REGISTER} element={<Register />} />
          <Route element= {<Layout />}>
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            <Route path={ROUTE_PATHS.PRODUCTS} element={<Products />} />
            <Route path={ROUTE_PATHS.PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={ROUTE_PATHS.LIBRARY} element={<Library />} />
            <Route path={ROUTE_PATHS.PROFILE} element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
