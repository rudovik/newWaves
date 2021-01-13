import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { authUser } from '../actions/userActions'

export const Auth = (Component, reload, adminRoute = null) => {
  const ComponentFunc = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.userAuth.loading)
    const user = useSelector((state) => state.userAuth.user)
    const error = useSelector((state) => state.userAuth.error)
    const loginSuccess = useSelector((state) => state.userLogin.loginSuccess)

    useEffect(() => {
      if (!user) {
        dispatch(authUser())
      } else {
        adminRoute && !user.isAdmin && history.push('/user/dashboard')
        user && reload === false && history.push('/user/dashboard')
      }
    }, [user, dispatch, history])

    useEffect(() => {
      error && !loginSuccess && reload && history.push('/register_login')
    }, [error, history, loginSuccess, dispatch])

    if (loading === null) return null

    return loading ||
      (!user && reload === true) ||
      (user && reload === false) ||
      (adminRoute && user && !user.isAdmin) ? (
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
