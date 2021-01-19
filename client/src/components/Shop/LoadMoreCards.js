import React from 'react'
import CardBlockShop from '../utils/CardBlockShop'

const LoadMoreCards = ({ grid, products, loadMore, size, limit }) => {
  return (
    <div>
      <div>
        <CardBlockShop grid={grid} list={products} />
      </div>
      {size && size === limit && (
        <div className='load_more_container'>
          <span
            onClick={() => {
              loadMore()
            }}
          >
            Load More
          </span>
        </div>
      )}
    </div>
  )
}

export default LoadMoreCards
