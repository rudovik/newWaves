import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { authUser } from '../actions/userActions'

export const Auth = (Component, reload, adminRoute = null) => {
  const ComponentFunc = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.userAuth)
    const { loading, user } = userData

    useEffect(() => {
      if (!user) {
        dispatch(authUser())
      } else {
        !user.isAuth && reload === true && history.push('/register_login')
        user.isAuth && reload === false && history.push('/user/dashboard')
        adminRoute && !user.isAdmin && history.push('/user/dashboard')
      }
    }, [user, loading, dispatch, history])

    console.log(user)
    console.log(Component)

    // if (reload === null) {
    //   return <Component {...props} />
    // }

    return loading ||
      (!user.isAuth && reload === true) ||
      (user.isAuth && reload === false) ||
      (adminRoute && !user.isAdmin) ? (
      <div className='main_loader'>
        <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
      </div>
    ) : (
      <Component {...props} user={user} />
    )
  }

  return ComponentFunc
}

export default Auth
