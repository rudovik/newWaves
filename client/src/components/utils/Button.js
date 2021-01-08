import React from 'react'
import { Link } from 'react-router-dom'

const makeButton = ({ type, title, linkTo, addStyles }) => {
  let template = ''

  switch (type) {
    case 'default':
      template = (
        <Link className='link_default' to={linkTo} {...addStyles}>
          {title}
        </Link>
      )

      break
    default:
      template = ''
  }

  return template
}

const Button = ({ type, title, linkTo, addStyles }) => {
  return (
    <div className='my_link'>
      {makeButton({ type, title, linkTo, addStyles })}
    </div>
  )
}

export default React.memo(Button)
