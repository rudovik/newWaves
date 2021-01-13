import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

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
    },
  ],
}

const defaultLink = (item, i) => (
  <Link to={item.linkTo} key={i}>
    {item.name}
  </Link>
)

const showLinks = (type, user) => {
  const list = []

  type.forEach((item) => {
    if (!user) {
      item.public && list.push(item)
    } else {
      !item.hideIfAuth && list.push(item)
    }
  })

  const linksToReturn = list.map((item, i) => {
    return defaultLink(item, i)
  })

  return linksToReturn
}

const Header = () => {
  const user = useSelector((state) => state.userAuth.user)

  return (
    <header className='bck_b_light'>
      <div className='container'>
        <div className='left'>
          <div className='logo'>WAVES</div>
        </div>
        <div className='right'>
          <div className='top'>{showLinks(links.user, user)}</div>
          <div className='bottom'>{showLinks(links.page, user)}</div>
        </div>
      </div>
    </header>
  )
}

export default Header
