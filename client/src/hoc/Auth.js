import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { authUser /*setLoginLoadingToNull*/ } from '../actions/userActions'

// import { USER_AUTH_RESET } from '../constants/userConstants'

export const Auth = (Component, reload, adminRoute = null) => {
  const ComponentFunc = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.userLogin.loading)
    const user = useSelector((state) => state.userLogin.user)
    const authError = useSelector((state) => state.userLogin.authError)

    useEffect(() => {
      if (!loading) {
        if (!user) {
          !authError && dispatch(authUser())
          authError && reload && history.push('/register_login')
          authError === false && reload && history.push('/')
        } else {
          adminRoute && !user.isAdmin && history.push('/user/dashboard')
          user && reload === false && history.push('/user/dashboard')
        }
      }
    }, [authError, user, dispatch, history, loading])

    // console.log('-------------------------')
    // console.log('authError ', authError)
    // console.log('reload: ', reload)
    // console.log('user: ', user)
    // console.log('loading: ', loading)
    // console.log('-------------------------')

    return (!user && !authError) ||
      (!user && authError && reload) ||
      loading ? (
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
