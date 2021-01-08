import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Layout from './hoc/Layout'
import RegisterLogin from './components/RegisterLogin/RegisterLogin'

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path='/register_login' exact component={RegisterLogin} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes
