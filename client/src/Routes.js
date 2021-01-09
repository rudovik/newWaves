import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Layout from './hoc/Layout'
import RegisterLogin from './components/RegisterLogin/RegisterLogin'
import Register from './components/RegisterLogin/Register'

import UserDashboard from './components/User/UserDashboard'

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path='/user/dashboard' exact component={UserDashboard} />
        <Route path='/register' exact component={Register} />
        <Route path='/register_login' exact component={RegisterLogin} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes
