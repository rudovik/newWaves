import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormField from '../utils/Form/FormField'
import { update, generateData, checkForm } from '../utils/Form/formActions'
import {
  registerUser,
  userRegisterFailReset,
  userRegisterSuccessReset,
} from '../../actions/userActions'
import { useHistory } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'

const Register = () => {
  const [form, setForm] = useState({
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          lastname: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your lastname',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
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
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password',
        },
        validation: {
          required: true,
          confirm: 'password',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  })

  const userRegister = useSelector((state) => state.userRegister)
  const { /*loading,*/ registerSuccess, error } = userRegister
  const dispatch = useDispatch()

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(form.formData, 'register')
    const formIsValid = checkForm(form.formData, 'register')

    if (formIsValid) {
      dispatch(registerUser(dataToSubmit))
    } else {
      setForm({ ...form, formError: true })
    }
  }

  const updateForm = (element) => {
    const newFormData = update(element, form.formData, 'register')
    setForm({ ...form, formData: newFormData, formError: false })
    error && dispatch(userRegisterFailReset())
  }

  const history = useHistory()
  useEffect(() => {
    if (registerSuccess) {
      setForm((form) => ({ ...form, formSuccess: true }))
      setTimeout(() => {
        history.push('register_login')
      }, 3000)
      dispatch(userRegisterSuccessReset())
    }
  }, [registerSuccess, history, dispatch])

  return (
    <div className='page_wrapper'>
      <div className='container'>
        <div className='register_login_container'>
          <div className='left'>
            <form onSubmit={(event) => submitForm(event)}>
              <h2>Personal information</h2>
              <div className='form_block_two'>
                <div className='block'>
                  <FormField
                    id={'name'}
                    fieldData={form.formData.name}
                    change={(element) => updateForm(element)}
                  />
                </div>
                <div className='block'>
                  <FormField
                    id={'lastname'}
                    fieldData={form.formData.lastname}
                    change={(element) => updateForm(element)}
                  />
                </div>
              </div>
              <div>
                <FormField
                  id={'email'}
                  fieldData={form.formData.email}
                  change={(element) => updateForm(element)}
                />
              </div>
              <h2>Verify password</h2>
              <div className='form_block_two'>
                <div className='block'>
                  <FormField
                    id={'password'}
                    fieldData={form.formData.password}
                    change={(element) => updateForm(element)}
                  />
                </div>
                <div className='block'>
                  <FormField
                    id={'confirmPassword'}
                    fieldData={form.formData.confirmPassword}
                    change={(element) => updateForm(element)}
                  />
                </div>
              </div>
              {(form.formError || error) && (
                <div className='error_label'>
                  {error || 'Please check your data.'}
                </div>
              )}
              <button onClick={(event) => submitForm(event)}>
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={form.formSuccess}>
        <div className='dialog_alert'>
          <div>Congratulations</div>
          <div>
            You will be redirected to the LOGIN in a couple of seconds...
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Register
