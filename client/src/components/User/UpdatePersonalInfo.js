import React, { useState, useEffect } from 'react'
import FormField from '../utils/Form/FormField'
import { useSelector, useDispatch } from 'react-redux'
import {
  update,
  generateData,
  checkForm,
  populateFields,
} from '../utils/Form/formActions'
import { updateUserData, clearUpdateUserForm } from '../../actions/userActions'

const UpdatePersonalInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userLogin.user)
  const updateUser = useSelector((state) => state.userLogin.updateUser)

  const [state, setState] = useState({
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
    },
  })

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'update_user')
    setState({ ...state, formData: newFormData, formError: false })
    // loginError && dispatch(userLoginFailReset())
  }

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'login')
    const formIsValid = checkForm(state.formData, 'login')

    if (formIsValid) {
      dispatch(updateUserData(dataToSubmit))
    } else {
      setState({ ...state, formError: true })
    }
  }

  useEffect(() => {
    user &&
      setState((state) => {
        const newFormData = populateFields(state.formData, user)
        return { ...state, formData: newFormData }
      })
  }, [user])

  useEffect(() => {
    if (updateUser) {
      dispatch(clearUpdateUserForm())
      setState((state) => ({ ...state, formSuccess: true }))
      setTimeout(() => {
        setState((state) => ({ ...state, formSuccess: false }))
      }, 2000)
    }
  }, [updateUser, dispatch])

  return (
    <div>
      <form onSubmit={(event) => submitForm(event)}>
        <h2>Personal information</h2>
        <div className='form_block_two'>
          <div className='block'>
            <FormField
              id={'name'}
              fieldData={state.formData.name}
              change={(element) => updateForm(element)}
            />
          </div>
          <div className='block'>
            <FormField
              id={'lastname'}
              fieldData={state.formData.lastname}
              change={(element) => updateForm(element)}
            />
          </div>
        </div>
        <div>
          <FormField
            id={'email'}
            fieldData={state.formData.email}
            change={(element) => updateForm(element)}
          />
        </div>
        {state.formSuccess && <div className='form_success'>Success</div>}
        {state.formError && (
          <div className='error_label'>{'Please check your data.'}</div>
        )}
        <button onClick={(event) => submitForm(event)}>
          Update personal info
        </button>
      </form>
    </div>
  )
}

export default UpdatePersonalInfo
