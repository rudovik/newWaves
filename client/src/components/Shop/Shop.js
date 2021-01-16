import React, { useEffect } from 'react'
import PageTop from '../utils/PageTop'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands, getWoods } from '../../actions/productActions'

const Shop = () => {
  const brands = useSelector((state) => state.products.brands)
  const woods = useSelector((state) => state.products.woods)
  const dispatch = useDispatch()

  useEffect(() => {
    !brands && dispatch(getBrands())
    brands && !woods && dispatch(getWoods())
  })
  return (
    <div>
      <PageTop title='Browse Products' />
      <div className='container'>
        <div className='shop_wrapper'>
          <div className='left'>left</div>
          <div className='right'>right</div>
        </div>
      </div>
    </div>
  )
}

export default Shop
