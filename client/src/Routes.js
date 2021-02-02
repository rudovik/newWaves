import { Switch, Route } from 'react-router-dom'

// import axios from 'axios'
import Home from './components/Home/Home'
import Layout from './hoc/Layout'
import RegisterLogin from './components/RegisterLogin/RegisterLogin'
import Register from './components/RegisterLogin/Register'
import Auth from './hoc/Auth'
import Shop from './components/Shop/Shop'

import UserDashboard from './components/User/UserDashboard'
import AddProduct from './components/User/admin/AddProduct'
import ManageCategories from './components/User/admin/ManageCategories'
import ProductPage from './components/ProductPage/ProductPage'
import ResetUser from './components/ResetUser/ResetUser'
import ResetPassword from './components/ResetUser/ResetPassword'

import UserCart from './components/User/Cart'
import UpdateProfile from './components/User/UpdateProfile'
import ManageSite from './components/User/admin/ManageSite'
import PageNotFound from './components/utils/PageNotFound'
import AddFile from './components/User/admin/AddFile'

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route
          path='/user/dashboard'
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route
          path='/user/user_profile'
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Route path='/user/cart' exact component={Auth(UserCart, true)} />
        <Route
          path='/admin/add_product'
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path='/admin/manage_categories'
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route
          path='/admin/site_info'
          exact
          component={Auth(ManageSite, true)}
        />
        <Route path='/admin/add_file' exact component={Auth(AddFile, true)} />
        {/* <Route
          exact
          path='/api/users/download/:id'
          component={Auth(AddFile, true)}
        /> */}

        <Route path='/register' exact component={Auth(Register, false)} />
        <Route
          path='/register_login'
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path='/reset_user' exact component={Auth(ResetUser, false)} />
        <Route
          path='/reset_password/:token'
          exact
          component={Auth(ResetPassword, false)}
        />

        <Route
          path='/product_detail/:id'
          exact
          component={Auth(ProductPage, null)}
        />
        <Route path='/shop' exact component={Auth(Shop, null)} />
        <Route path='/' exact component={Auth(Home, null)} />
        <Route component={Auth(PageNotFound, null)} />
      </Switch>
    </Layout>
  )
}

export default Routes
