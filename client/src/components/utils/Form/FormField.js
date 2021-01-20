import React from 'react'

const showError = (fieldData) => {
  let errorMessage = ''

  if (fieldData.validation && !fieldData.valid) {
    errorMessage = (
      <div className='error_label'>{fieldData.validationMessage}</div>
    )
  }
  return errorMessage
}

const renderTemplate = ({ fieldData, change, id }) => {
  let fieldTemplate = ''
  switch (fieldData.element) {
    case 'input':
      fieldTemplate = (
        <div className='formBlock'>
          {fieldData.showLabel && (
            <div className='label_inputs'>{fieldData.config.label}</div>
          )}
          <input
            {...fieldData.config}
            value={fieldData.value}
            onBlur={(event) => change({ event, id, blur: true })}
            onChange={(event) => change({ event, id })}
          />
          {showError(fieldData)}
        </div>
      )
      break
    case 'select':
      fieldTemplate = (
        <div className='formBlock'>
          {fieldData.showLabel && (
            <div className='label_inputs'>{fieldData.config.label}</div>
          )}
          <select
            value={fieldData.value}
            onBlur={(event) => change({ event, id, blur: true })}
            onChange={(event) => change({ event, id })}
          >
            <option value=''>Select one</option>
            {fieldData.config.options.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          {showError(fieldData)}
        </div>
      )
      break
    case 'textarea':
      fieldTemplate = (
        <div className='formBlock'>
          {fieldData.showLabel && (
            <div className='label_inputs'>{fieldData.config.label}</div>
          )}
          <textarea
            {...fieldData.config}
            value={fieldData.value}
            onBlur={(event) => change({ event, id, blur: true })}
            onChange={(event) => change({ event, id })}
          />
          {showError(fieldData)}
        </div>
      )
      break
    default:
      fieldTemplate = ''
  }

  return fieldTemplate
}

const FormField = ({ fieldData, change, id }) => {
  return <div>{renderTemplate({ fieldData, change, id })}</div>
}

export default FormField
