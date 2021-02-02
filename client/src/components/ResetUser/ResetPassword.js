import React, { useState } from 'react'
import axios from 'axios'
import { update, generateData, checkForm } from '../utils/Form/formActions'
import FormField from '../utils/Form/FormField'
import { USER_SERVER, getErrorPayload } from '../../components/utils/misc'
import Dialog from '@material-ui/core/Dialog'
import { useHistory } from 'react-router-dom'

const resetPassword = async ({
  dataToSubmit,
  setState,
  resetToken,
  history,
}) => {
  try {
    const { data } = await axios.post(`${USER_SERVER}/reset_password`, {
      ...dataToSubmit,
      resetToken,
    })

    if (!data.success) {
      setState((state) => ({
        ...state,
        formError: true,
        formErrorMessage: data.message,
      }))
    } else {
      setState((state) => ({
        ...state,
        formSuccess: true,
      }))
      setTimeout(() => {
        setState((state) => ({
          ...state,
          formError: false,
        }))
        history.push('/register_login')
      }, 3000)
    }
  } catch (error) {
    setState((state) => ({
      ...state,
      formError: true,
      formErrorMessage: getErrorPayload(error),
    }))
  }
}

const ResetPassword = ({ match }) => {
  const [state, setState] = useState({
    resetToken: match.params.token,
    formError: false,
    formErrorMessage: '',
    formSuccess: false,
    formData: {
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
  const history = useHistory()

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'reset_password')
    setState({ ...state, formData: newFormData, formError: false })
  }

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'reset_password')
    const formIsValid = checkForm(state.formData, 'reset_password')

    if (formIsValid) {
      // console.log(dataToSubmit)
      resetPassword({
        dataToSubmit,
        setState,
        resetToken: state.resetToken,
        history,
      })
    } else {
      setState({ ...state, formError: true })
    }
  }

  // const { token } = match.params
  // useEffect(() => {
  //   token &&
  //     setState((state) => ({
  //       ...state,
  //       resetToken: token,
  //     }))
  // }, [token])

  return (
    <div className='container'>
      <form onSubmit={(event) => submitForm(event)}>
        <h2>Reset password</h2>
        <div className='form_block_two'>
          <div className='block'>
            <FormField
              id={'password'}
              fieldData={state.formData.password}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className='block'>
            <FormField
              id={'confirmPassword'}
              fieldData={state.formData.confirmPassword}
              change={(element) => updateForm(element)}
            />
          </div>
        </div>

        {state.formSuccess && (
          <div className='form_success'>Done, the password is changed.</div>
        )}

        {state.formError && (
          <div className='error_label'>{state.formErrorMessage}</div>
        )}

        <button onClick={(event) => submitForm(event)}>Reset password</button>
      </form>
      <Dialog open={state.formSuccess}>
        <div className='dialog_alert'>
          <div>Alright!</div>
          <div>Your password was reseted... And you will be redirected...</div>
        </div>
      </Dialog>
    </div>
  )
}

export default ResetPassword
