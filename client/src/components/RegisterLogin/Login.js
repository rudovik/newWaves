import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormField from '../utils/Form/FormField'
import { update, generateData, checkForm } from '../utils/Form/formActions'
import { loginUser, userLoginFailReset } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState({
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  })
  const [formError, setFormError] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { /*loading,*/ loginSuccess, error } = userLogin
  const dispatch = useDispatch()

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'login')
    const formIsValid = checkForm(state.formData, 'login')

    if (formIsValid) {
      dispatch(loginUser(dataToSubmit))
    } else {
      setFormError(true)
    }
  }

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'login')
    setState({ ...state, formData: newFormData })
    setFormError(false)
    error && dispatch(userLoginFailReset())
  }

  const history = useHistory()
  useEffect(() => {
    loginSuccess && history.push('/user/dashboard')
  }, [loginSuccess, history])

  return (
    <div className='signin_wrapper'>
      <form onSubmit={(event) => submitForm(event)}>
        <FormField
          id={'email'}
          fieldData={state.formData.email}
          change={(element) => updateForm(element)}
        />

        <FormField
          id={'password'}
          fieldData={state.formData.password}
          change={(element) => updateForm(element)}
        />

        {(formError || error) && (
          <div className='error_label'>
            {error ? error : 'Please check your data.'}
          </div>
        )}
        <button onClick={(event) => submitForm(event)}>Log In</button>
      </form>
    </div>
  )
}

export default Login
