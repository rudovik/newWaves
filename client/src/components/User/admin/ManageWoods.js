import React, { useState, useEffect } from 'react'
import FormField from '../../utils/Form/FormField'
import {
  update,
  generateData,
  checkForm,
  resetFields,
} from '../../utils/Form/formActions'
import { useSelector, useDispatch } from 'react-redux'
import { getWoods, addWood } from '../../../actions/productActions'

const ManageWoods = () => {
  const woods = useSelector((state) => state.products.woods)
  const addWoodSuccess = useSelector((state) => state.products.addWood)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'wood_input',
          type: 'text',
          placeholder: 'Enter the wood',
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

  const showCategoryItems = () =>
    woods &&
    woods.map((item, i) => (
      <div className='category_item' key={item._id}>
        {item.name}
      </div>
    ))

  useEffect(() => {
    !woods && dispatch(getWoods())
  })

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'woods')
    setState({ ...state, formData: newFormData, formError: false })
    // error && dispatch(userRegisterFailReset())
  }

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'woods')
    const formIsValid = checkForm(state.formData, 'woods')

    if (formIsValid) {
      dispatch(addWood(dataToSubmit, woods))
    } else {
      setState({ ...state, formError: true })
    }
  }

  useEffect(() => {
    addWoodSuccess &&
      setState((state) => {
        const newFormData = resetFields(state.formData)
        return { ...state, formData: newFormData }
      })
  }, [addWoodSuccess])

  return (
    <div className='admin_category_wrapper'>
      <h1>Woods</h1>
      <div className='admin_two_column'>
        <div className='left'>
          <div className='brands_container'>{showCategoryItems()}</div>
        </div>
        <div className='right'>
          <form onSubmit={(event) => submitForm(event)}>
            <FormField
              id={'name'}
              fieldData={state.formData.name}
              change={(element) => updateForm(element)}
            />

            {state.formSuccess && <div className='form_success'>Success</div>}

            {state.formError && (
              <div className='error_label'>{'Please check your data.'}</div>
            )}
            <button onClick={(event) => submitForm(event)}>Add wood</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ManageWoods
