import React, { useState, useEffect } from 'react'
import UserLayout from '../../hoc/UserLayout'
import { useSelector, useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../actions/userActions'
import ProductsBlock from '../utils/User/ProductsBlock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-solid-svg-icons'

const calculateTotal = (cartDetails) => {
  let total = 0
  cartDetails.forEach((item) => {
    total += parseInt(item.price, 10) * item.quantity
  })
  return total
}

const showNoItemsMessage = () => (
  <div className='cart_no_items'>
    <FontAwesomeIcon icon={faFrown} />
    <div>You have no items</div>
  </div>
)

const Cart = () => {
  const cart = useSelector((state) => state.userCart.cart)
  const cartDetails = useSelector((state) => state.userCart.cartDetails)
  // const user = useSelector((state) => state.userLogin.user)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
  })

  useEffect(() => {
    if (cart && cart.length) {
      let cartItems = []
      cart.forEach((item) => {
        cartItems.push(item.id)
      })
      dispatch(getCartItems(cartItems, cart))
    }
  }, [cart, dispatch])

  useEffect(() => {
    cartDetails.length &&
      setState((state) => ({
        ...state,
        total: calculateTotal(cartDetails),
        showTotal: true,
        loading: false,
      }))
    !cartDetails.length &&
      setState((state) => ({
        ...state,
        showTotal: false,
        loading: false,
      }))
  }, [cartDetails])

  const removeFromCart = (id) => {
    dispatch(removeCartItem(id))
  }
  return (
    <UserLayout>
      <div>
        <h1>My cart</h1>
        <div className='user_cart'>
          <ProductsBlock
            products={cartDetails}
            type='cart'
            removeItem={(id) => removeFromCart(id)}
          />
          {state.showTotal ? (
            <div className='user_cart_sum'>
              <div>Total amount: $ {state.total}</div>
            </div>
          ) : state.showSuccess ? (
            <div className='cart_success'>
              <FontAwesomeIcon icon={faSmile} />
              <div>Thank you</div>
              <div>You order is now complete</div>
            </div>
          ) : (
            !cart.length && showNoItemsMessage()
          )}
        </div>
        {state.showTotal && (
          <div className='paypal_button_container'>PayPal</div>
        )}
      </div>
    </UserLayout>
  )
}

export default Cart