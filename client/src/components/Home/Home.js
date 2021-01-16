import React, { useEffect } from 'react'
import HomeSlider from './HomeSlider'
import HomePromotion from './HomePromotion'
import CardBlock from '../utils/CardBlock'

import { useSelector, useDispatch } from 'react-redux'
import {
  getProductsBySell,
  getProductsByArrival,
} from '../../actions/productActions'

const Home = () => {
  const productsBySell = useSelector((state) => state.products.productsBySell)
  const productsByArrival = useSelector(
    (state) => state.products.productsByArrival
  )
  const dispatch = useDispatch()

  useEffect(() => {
    !productsBySell && dispatch(getProductsBySell())
    productsBySell && !productsByArrival && dispatch(getProductsByArrival())
  }, [productsBySell, productsByArrival, dispatch])

  return (
    <div>
      <HomeSlider />
      {productsBySell && (
        <CardBlock list={productsBySell} title='Best selling guitars' />
      )}
      <HomePromotion />
      {productsByArrival && (
        <CardBlock list={productsByArrival} title='New arrivals' />
      )}
    </div>
  )
}

export default Home
