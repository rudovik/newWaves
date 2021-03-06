import React from 'react'
import MyButton from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../actions/userActions'

const renderCardImage = (images) => {
  if (images.length > 0) {
    return images[0].url
  } else {
    return '/images/image_not_available.png'
  }
}

const Card = (props) => {
  const user = useSelector((state) => state.userLogin.user)
  const dispatch = useDispatch()

  return (
    <div className={`card_item_wrapper ${props.grid}`}>
      <div
        className='image'
        style={{
          background: `url(${renderCardImage(props.images)})`,
        }}
      ></div>
      <div className='action_container'>
        <div className='tags'>
          <div className='brand'>{props.brand.name}</div>
          <div className='name'>{props.name}</div>
          <div className='price'>${props.price}</div>
        </div>
        {props.grid && (
          <div className='description'>
            <p>{props.description}</p>
          </div>
        )}
        <div className='actions'>
          <div className='button_wrapp'>
            <MyButton
              rudovik={'Hi!'}
              type='default'
              altClass='card_link'
              title='View product'
              linkTo={`/product_detail/${props._id}`}
              addStyles={{
                margin: '10px 0 0 0',
              }}
            />
          </div>
          <div className='button_wrapp'>
            <MyButton
              type='bag_link'
              runAction={() => {
                user
                  ? dispatch(addToCart(props._id))
                  : console.log('You need to log in')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
