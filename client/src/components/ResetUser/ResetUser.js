import React, { useState } from 'react'
import axios from 'axios'
import { update, generateData, checkForm } from '../utils/Form/formActions'
import FormField from '../utils/Form/FormField'
import { USER_SERVER, getErrorPayload } from '../../components/utils/misc'

const resetUser = async ({ dataToSubmit, setState }) => {
  try {
    await axios.post(`${USER_SERVER}/reset_user`, dataToSubmit)
    setState((state) => ({
      ...state,
      formSuccess: true,
    }))
    setTimeout(() => {
      setState((state) => ({
        ...state,
        formSuccess: false,
      }))
    }, 3000)
  } catch (error) {
    setState((state) => ({
      ...state,
      formError: getErrorPayload(error),
    }))
  }
}

const ResetUser = () => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
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
    },
  })

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'reset_email')
    setState({ ...state, formData: newFormData, formError: false })
  }

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'reset_email')
    const formIsValid = checkForm(state.formData, 'reset_email')

    if (formIsValid) {
      resetUser({ dataToSubmit, setState })
    } else {
      setState({ ...state, formError: true })
    }
  }

  return (
    <div className='container'>
      <h1>Reset password</h1>
      <form onSubmit={(event) => submitForm(event)}>
        <FormField
          id={'email'}
          fieldData={state.formData.email}
          change={(element) => updateForm(element)}
        />

        {state.formSuccess && (
          <div className='form_success'>Done, check your email</div>
        )}

        {state.formError && (
          <div className='error_label'>Please check your data.</div>
        )}

        <button onClick={(event) => submitForm(event)}>Enter your email</button>
      </form>
    </div>
  )
}

export default ResetUser
