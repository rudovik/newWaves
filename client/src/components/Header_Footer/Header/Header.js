import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from '../../../actions/userActions'

const links = {
  page: [
    {
      name: 'Home',
      linkTo: '/',
      public: true,
    },
    {
      name: 'Guitars',
      linkTo: '/shop',
      public: true,
    },
  ],
  user: [
    {
      name: 'My Cart',
      linkTo: '/user/cart',
      public: false,
      cartLink: true,
    },
    {
      name: 'My Account',
      linkTo: '/user/dashboard',
      public: false,
    },
    {
      name: 'Log in',
      linkTo: '/register_login',
      public: true,
      hideIfAuth: true,
    },
    {
      name: 'Log out',
      linkTo: '/user/logout',
      public: false,
      logoutLink: true,
    },
  ],
}

const defaultLink = (item, i, dispatch) =>
  item.logoutLink ? (
    <div
      className='log_out_link'
      key={i}
      onClick={() => {
        dispatch(logoutUser())
      }}
    >
      {item.name}
    </div>
  ) : (
    <Link to={item.linkTo} key={i}>
      {item.name}
    </Link>
  )
const cartLink = (item, i, user) => {
  return (
    <div className='cart_link' key={i}>
      <span>{user.cart ? user.cart.length : 0}</span>
      <Link to={item.linkTo}>{item.name}</Link>
    </div>
  )
}

const showLinks = (type, user, dispatch) => {
  const list = []

  type.forEach((item) => {
    if (!user) {
      item.public && list.push(item)
    } else {
      !item.hideIfAuth && list.push(item)
    }
  })

  return list.map((item, i) => {
    if (!item.cartLink) {
      return defaultLink(item, i, dispatch)
    } else {
      return cartLink(item, i, user)
    }
  })
}

const Header = () => {
  const user = useSelector((state) => state.userLogin.user)

  const dispatch = useDispatch()

  return (
    <header className='bck_b_light'>
      <div className='container'>
        <div className='left'>
          <div className='logo'>WAVES</div>
        </div>
        <div className='right'>
          <div className='top'>{showLinks(links.user, user, dispatch)}</div>
          <div className='bottom'>{showLinks(links.page, user, dispatch)}</div>
        </div>
      </div>
    </header>
  )
}

export default Header
