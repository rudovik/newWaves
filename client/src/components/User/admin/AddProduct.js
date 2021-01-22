import React, { useState, useEffect, useCallback } from 'react'
import UserLayout from '../../../hoc/UserLayout'
import FormField from '../../utils/Form/FormField'
import {
  update,
  generateData,
  checkForm,
  populateOptionFields,
  resetFields,
} from '../../utils/Form/formActions'
import FileUpload from '../../utils/FileUpload'
import { useSelector, useDispatch } from 'react-redux'

import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct,
} from '../../../actions/productActions'

const AddProduct = () => {
  const brands = useSelector((state) => state.products.brands)
  const woods = useSelector((state) => state.products.woods)
  const addProd = useSelector((state) => state.products.addProduct)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
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
        showLabel: true,
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter your price',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product brand',
          name: 'brand_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood',
          name: 'wood_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in stock',
          name: 'available_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false,
      },
    },
  })

  useEffect(() => {
    !woods && dispatch(getWoods())
    woods && !brands && dispatch(getBrands())
    woods &&
      brands &&
      setState((state) => {
        const formData = state.formData
        let newFormData = populateOptionFields(formData, brands, 'brand')
        newFormData = populateOptionFields(newFormData, woods, 'wood')
        return { ...state, formData: newFormData }
      })
  }, [brands, woods, dispatch])

  useEffect(() => {
    addProd &&
      addProd.success &&
      setState((state) => {
        const newFormData = resetFields(state.formData)
        setTimeout(() => {
          setState((state) => ({ ...state, formSuccess: false }))
          dispatch(clearProduct())
        }, 3000)
        return { ...state, formSuccess: true, formData: newFormData }
      })
  }, [addProd, dispatch])

  const error = null

  const submitForm = (event) => {
    event.preventDefault()
    let dataToSubmit = generateData(state.formData, 'products')
    const formIsValid = checkForm(state.formData, 'products')

    if (formIsValid) {
      dispatch(addProduct(dataToSubmit))
    } else {
      setState({ ...state, formError: true })
    }
  }

  const updateForm = (element) => {
    const newFormData = update(element, state.formData, 'products')
    setState({ ...state, formData: newFormData, formError: false })
    // error && dispatch(userRegisterFailReset())
  }

  const imagesHandler = useCallback(
    (images) => {
      const newFormData = {
        ...state.formData,
      }
      newFormData['images'].value = images
      newFormData['images'].valid = true

      setState((state) => ({ ...state, formData: newFormData }))
    },
    [state.formData]
  )

  return (
    <UserLayout>
      <div>
        <h1>Add product</h1>
        <form onSubmit={(event) => submitForm(event)}>
          <FileUpload imagesHandler={imagesHandler} reset={state.formSuccess} />

          <FormField
            id={'name'}
            fieldData={state.formData.name}
            change={(element) => updateForm(element)}
          />

          <FormField
            id={'description'}
            fieldData={state.formData.description}
            change={(element) => updateForm(element)}
          />

          <FormField
            id={'price'}
            fieldData={state.formData.price}
            change={(element) => updateForm(element)}
          />

          <div className='form_devider'></div>

          <FormField
            id={'brand'}
            fieldData={state.formData.brand}
            change={(element) => updateForm(element)}
          />

          <FormField
            id={'shipping'}
            fieldData={state.formData.shipping}
            change={(element) => updateForm(element)}
          />

          <FormField
            id={'available'}
            fieldData={state.formData.available}
            change={(element) => updateForm(element)}
          />

          <div className='form_devider'></div>

          <FormField
            id={'wood'}
            fieldData={state.formData.wood}
            change={(element) => updateForm(element)}
          />

          <FormField
            id={'frets'}
            fieldData={state.formData.frets}
            change={(element) => updateForm(element)}
          />

          <div className='form_devider'></div>

          <FormField
            id={'publish'}
            fieldData={state.formData.publish}
            change={(element) => updateForm(element)}
          />

          {state.formSuccess && <div className='form_success'>Success</div>}

          {(state.formError || error) && (
            <div className='error_label'>
              {error || 'Please check your data.'}
            </div>
          )}
          <button onClick={(event) => submitForm(event)}>Add product</button>
        </form>
      </div>
    </UserLayout>
  )
}

export default AddProduct
