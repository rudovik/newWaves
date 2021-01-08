import React from 'react'

import Header from '../components/Header_Footer/Header/Header'
import Footer from '../components/Header_Footer/Footer/Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='page_container'>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
