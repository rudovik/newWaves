import React, { useState, useEffect } from 'react'
import {
  update,
  generateData,
  checkForm,
  populateFields,
} from '../../utils/Form/formActions'
import FormField from '../../utils/Form/FormField'
import { useSelector, useDispatch } from 'react-redux'

import {
  getSiteData,
  updateSiteData,
  resetSuccessUpdate,
} from '../../../actions/siteActions'

const UpdateSiteInfo = () => {
  const siteData = useSelector((state) => state.site.siteData[0])
  const success = useSelector((state) => state.site.success)
  const siteDataLoading = useSelector((state) => state.site.loading)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the site working hours',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone number',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the site phone number',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Shop email',
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter the site email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
    },
  })

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'site_info')
    setState({ ...state, formData: newFormData, formError: false })
    // loginError && dispatch(userLoginFailReset())
  }

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'site_info')
    const formIsValid = checkForm(state.formData, 'site_info')

    if (formIsValid) {
      dispatch(updateSiteData(dataToSubmit))
      // dispatch(updateUserData(dataToSubmit))
    } else {
      setState({ ...state, formError: true })
    }
  }

  useEffect(() => {
    !siteData && !siteDataLoading && dispatch(getSiteData())
    siteData &&
      setState((state) => {
        const newFormData = populateFields(state.formData, siteData)
        return { ...state, formData: newFormData }
      })
  }, [siteData, siteDataLoading, dispatch])

  useEffect(() => {
    if (success) {
      setState((state) => ({ ...state, formSuccess: true }))
      setTimeout(() => {
        setState((state) => ({ ...state, formSuccess: false }))
      }, 2000)
      dispatch(resetSuccessUpdate())
    }
  }, [success, dispatch])

  return (
    <div>
      <h1>Site info</h1>
      <form onSubmit={(event) => submitForm(event)}>
        <FormField
          id={'address'}
          fieldData={state.formData.address}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'hours'}
          fieldData={state.formData.hours}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'phone'}
          fieldData={state.formData.phone}
          change={(element) => updateForm(element)}
        />
        <FormField
          id={'email'}
          fieldData={state.formData.email}
          change={(element) => updateForm(element)}
        />
        <div>
          {state.formSuccess && <div className='form_success'>Success</div>}
          {state.formError && (
            <div className='error_label'>{'Please check your data.'}</div>
          )}
          <button onClick={(event) => submitForm(event)}>
            Update site info
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSiteInfo
