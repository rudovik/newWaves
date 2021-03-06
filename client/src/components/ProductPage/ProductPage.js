import React, { useEffect } from 'react'
import PageTop from '../utils/PageTop'
import {
  getProductDetails,
  clearProductDetails,
} from '../../actions/productActions'
import ProdInfo from './ProdInfo'
import ProdImg from './ProdImg'

import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../actions/userActions'

const ProductPage = ({ match }) => {
  const { id } = match.params
  const { prodDetails } = useSelector((state) => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    !prodDetails && dispatch(getProductDetails(id))
  }, [id, dispatch, prodDetails])
  useEffect(() => {
    return () => {
      dispatch(clearProductDetails())
    }
  }, [dispatch])

  const addToCartHandler = (id) => {
    dispatch(addToCart(id))
    // console.log(id)
  }

  return (
    <div>
      <PageTop title='Product detail' />
      <div className='container'>
        {prodDetails ? (
          <div className='product_detail_wrapper'>
            <div className='left' style={{ width: '500px' }}>
              <ProdImg prodDetails={prodDetails} />
            </div>
            <div className='right'>
              <ProdInfo
                prodDetails={prodDetails}
                addToCart={(id) => addToCartHandler(id)}
              />
            </div>
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  )
}

export default ProductPage
