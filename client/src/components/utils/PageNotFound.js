import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const PageNotFound = () => {
  return (
    <div className='container'>
      <div className='not_found_container'>
        <FontAwesomeIcon icon={faExclamationCircle} />
        <div>Ooops!! Page not found.</div>
      </div>
    </div>
  )
}

export default PageNotFound
