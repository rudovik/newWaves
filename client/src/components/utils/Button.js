import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

const makeButton = ({
  type,
  title,
  linkTo,
  addStyles,
  altClass,
  runAction,
}) => {
  let template = ''

  switch (type) {
    case 'default':
      template = (
        <Link
          className={altClass ? altClass : 'link_default'}
          to={linkTo}
          {...addStyles}
        >
          {title}
        </Link>
      )
      break
    case 'bag_link':
      template = (
        <div
          className='bag_link'
          onClick={() => {
            runAction()
          }}
        >
          <FontAwesomeIcon icon={faShoppingBag} />
        </div>
      )
      break
    default:
      template = ''
  }

  return template
}

const Button = ({ type, title, linkTo, addStyles, altClass, runAction }) => {
  return (
    <div className='my_link'>
      {makeButton({ type, title, linkTo, addStyles, altClass, runAction })}
    </div>
  )
}

export default React.memo(Button)
