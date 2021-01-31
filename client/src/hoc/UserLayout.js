import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const links = [
  {
    name: 'My account',
    linkTo: '/user/dashboard',
  },
  {
    name: 'User information',
    linkTo: '/user/user_profile',
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart',
  },
]

const admin = [
  {
    name: 'Site info',
    linkTo: '/admin/site_info',
  },
  {
    name: 'Add product',
    linkTo: '/admin/add_product',
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage_categories',
  },
  {
    name: 'Upload file',
    linkTo: '/admin/add_file',
  },
]

const generateLinks = (links) =>
  links.map((item, i) => (
    <Link to={item.linkTo} key={i}>
      {item.name}
    </Link>
  ))

const UserLayout = ({ children }) => {
  const user = useSelector((state) => state.userLogin.user)

  return (
    <div className='container'>
      <div className='user_container'>
        <div className='user_left_nav'>
          <h2>My account</h2>
          <div className='links'>{generateLinks(links)}</div>
          {user.isAdmin && (
            <div>
              <h2>Admin</h2>
              <div className='links'>{generateLinks(admin)}</div>
            </div>
          )}
        </div>
        <div className='user_right'>{children}</div>
      </div>
    </div>
  )
}

export default UserLayout
