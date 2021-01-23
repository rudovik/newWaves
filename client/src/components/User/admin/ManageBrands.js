import React, { useState, useEffect } from 'react'
import FormField from '../../utils/Form/FormField'
import {
  update,
  generateData,
  checkForm,
  resetFields,
} from '../../utils/Form/formActions'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands, addBrand } from '../../../actions/productActions'

const ManageBrands = () => {
  const brands = useSelector((state) => state.products.brands)
  const addBrandSuccess = useSelector((state) => state.products.addBrand)
  const dispatch = useDispatch()

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
          placeholder: 'Enter the brand',
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
    brands &&
    brands.map((item, i) => (
      <div className='category_item' key={item._id}>
        {item.name}
      </div>
    ))

  useEffect(() => {
    !brands && dispatch(getBrands())
  })

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'brands')
    setState({ ...state, formData: newFormData, formError: false })
    // error && dispatch(userRegisterFailReset())
  }

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'brands')
    const formIsValid = checkForm(state.formData, 'brands')

    if (formIsValid) {
      dispatch(addBrand(dataToSubmit, brands))
    } else {
      setState({ ...state, formError: true })
    }
  }

  useEffect(() => {
    addBrandSuccess &&
      setState((state) => {
        const newFormData = resetFields(state.formData)
        return { ...state, formData: newFormData }
      })
  }, [addBrandSuccess])

  console.log(addBrandSuccess)

  return (
    <div className='admin_category_wrapper'>
      <h1>Brands</h1>
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
            <button onClick={(event) => submitForm(event)}>Add brand</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ManageBrands
