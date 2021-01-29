import React, { useEffect } from 'react'

import Header from '../components/Header_Footer/Header/Header'
import Footer from '../components/Header_Footer/Footer/Footer'

import { useSelector, useDispatch } from 'react-redux'
import { getSiteData } from '../actions/siteActions'

const Layout = ({ children }) => {
  const siteData = useSelector((state) => state.site.siteData[0])
  const siteDataLoading = useSelector((state) => state.site.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    !siteData && !siteDataLoading && dispatch(getSiteData())
  }, [siteData, siteDataLoading, dispatch])
  return (
    <div>
      <Header />
      <div className='page_container'>{children}</div>
      <Footer siteData={siteData} />
    </div>
  )
}

export default Layout
