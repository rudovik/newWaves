import React, { useEffect } from 'react'
import HomeSlider from './HomeSlider'
import HomePromotion from './HomePromotion'
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
      <HomePromotion />
    </div>
  )
}

export default Home
