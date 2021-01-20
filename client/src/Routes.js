import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Layout from './hoc/Layout'
import RegisterLogin from './components/RegisterLogin/RegisterLogin'
import Register from './components/RegisterLogin/Register'
import Auth from './hoc/Auth'
import Shop from './components/Shop/Shop'

import UserDashboard from './components/User/UserDashboard'
import AddProduct from './components/User/admin/AddProduct'

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
          path='/admin/add_product'
          exact
          component={Auth(AddProduct, true)}
        />
        <Route path='/register' exact component={Auth(Register, false)} />
        <Route
          path='/register_login'
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path='/shop' exact component={Auth(Shop, null)} />
        <Route path='/' exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  )
}

export default Routes
