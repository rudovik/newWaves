import React from 'react'
import MyButton from '../utils/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import { addToCart } from '../../actions/userActions'

const showProdTags = ({ shipping, available, addToCart }) => (
  <div className='product_tags'>
    {shipping && (
      <div className='tag'>
        <div>
          <FontAwesomeIcon icon={faTruck} />
        </div>
        <div className='tag_text'>
          <div>Free shipping</div>
          <div>And return</div>
        </div>
      </div>
    )}

    {available ? (
      <div className='tag'>
        <div>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div className='tag_text'>
          <div>Available</div>
          <div>in store</div>
        </div>
      </div>
    ) : (
      <div className='tag'>
        <div>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className='tag_text'>
          <div>Not Available</div>
          <div>Preorder only</div>
        </div>
      </div>
    )}
  </div>
)

const showProdActions = ({ price, _id }, addToCart) => (
  <div className='product_actions'>
    <div className='price'>$ {price}</div>
    <div className='cart'>
      <MyButton
        type='add_to_cart_link'
        runAction={() => {
          addToCart(_id)
        }}
      />
    </div>
  </div>
)

const showProdSpecifications = ({ frets, wood }) => (
  <div className='product_specifications'>
    <h2>Specs:</h2>
    <div>
      <div className='item'>
        <strong>Frets: </strong>
        {frets}
      </div>
      <div className='item'>
        <strong>Wood: </strong>
        {wood.name}
      </div>
    </div>
  </div>
)

const ProdInfo = ({ prodDetails, addToCart }) => {
  const { brand, name, description } = prodDetails
  return (
    <div>
      <h1>
        {brand.name} {name}
      </h1>
      <p>{description}</p>
      {showProdTags(prodDetails)}
      {showProdActions(prodDetails, addToCart)}
      {showProdSpecifications(prodDetails)}
    </div>
  )
}

export default ProdInfo
