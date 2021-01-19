import React from 'react'
import Card from '../utils/Card'

const CardBlockShop = ({ list, grid }) => {
  const renderCards = (list) =>
    list && list.map((card) => <Card key={card._id} {...card} grid={grid} />)

  return (
    <div className='card_block_shop'>
      <div>
        <div>
          {list && list.length === 0 && <div>Sorry, no results</div>}
          {renderCards(list)}
        </div>
      </div>
    </div>
  )
}

export default CardBlockShop
