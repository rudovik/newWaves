import React, { useEffect, useState } from 'react'
import PageTop from '../utils/PageTop'
import { useSelector, useDispatch } from 'react-redux'
import {
  getBrands,
  getWoods,
  getProductsToShop,
} from '../../actions/productActions'
import CollapseCheckbox from '../utils/CollapseCheckbox'
import CollapseRadio from '../utils/CollapseRadio'
import { frets, price } from '../utils/Form/fixed_categories'

import LoadMoreCards from './LoadMoreCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTh } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
  const brands = useSelector((state) => state.products.brands)
  const woods = useSelector((state) => state.products.woods)
  const toShop = useSelector((state) => state.products.toShop)
  const toShopSize = useSelector((state) => state.products.toShopSize)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    },
  })

  const handlePrice = (value) => {
    const data = price
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }

    return array
  }

  const handleFilters = (filters, category) => {
    const newFilters = { ...state.filters }

    if (category === 'price') {
      const priceValues = handlePrice(filters)
      newFilters[category] = priceValues
    } else {
      const filtersArr = []
      for (let id in filters) {
        filters[id] && filtersArr.push(id)
      }
      newFilters[category] = filtersArr
    }

    dispatch(getProductsToShop(0, state.limit, newFilters))
    setState({ ...state, filters: newFilters, skip: 0 })
  }

  useEffect(() => {
    !brands && dispatch(getBrands())
    brands && !woods && dispatch(getWoods())
    brands &&
      woods &&
      !toShop &&
      dispatch(
        getProductsToShop(state.skip, state.limit, state.filters, toShop)
      )
  })

  const loadMoreCards = () => {
    let skip = state.skip + state.limit
    dispatch(getProductsToShop(skip, state.limit, state.filters, toShop))
    setState({ ...state, skip })
  }

  const handleGrid = () => {
    setState({ ...state, grid: !state.grid ? 'grid_bars' : '' })
  }

  return (
    <div>
      <PageTop title='Browse Products' />
      <div className='container'>
        <div className='shop_wrapper'>
          <div className='left'>
            <CollapseCheckbox
              initState={true}
              title='Brands'
              list={brands}
              handleFilters={(filters) => handleFilters(filters, 'brand')}
            />
            <CollapseCheckbox
              initState={false}
              title='Frets'
              list={frets}
              handleFilters={(filters) => handleFilters(filters, 'frets')}
            />
            <CollapseCheckbox
              initState={false}
              title='Wood'
              list={woods}
              handleFilters={(filters) => handleFilters(filters, 'wood')}
            />
            <CollapseRadio
              initState={true}
              title='Price'
              list={price}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </div>
          <div className='right'>
            <div className='shop_options'>
              <div className='shop_grids clear'>
                <div
                  className={`grid_btn ${state.grid ? '' : 'active'}`}
                  onClick={() => handleGrid()}
                >
                  <FontAwesomeIcon icon={faTh} />
                </div>
                <div
                  className={`grid_btn ${!state.grid ? '' : 'active'}`}
                  onClick={() => handleGrid()}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </div>
            </div>
            <div>
              <LoadMoreCards
                grid={state.grid}
                limit={state.limit}
                size={toShopSize}
                products={toShop}
                loadMore={loadMoreCards}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
