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
    default:
      fieldTemplate = ''
  }

  return fieldTemplate
}

const FormField = ({ fieldData, change, id }) => {
  return <div>{renderTemplate({ fieldData, change, id })}</div>
}

export default FormField
