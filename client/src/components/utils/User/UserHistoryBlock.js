import React from 'react'
import moment from 'moment'

const renderBlocks = (products) =>
  products.map((product, i) => (
    <tr key={i}>
      <td>{moment(product.dateOfPurchases).format('MM-DD-YYYY')}</td>
      <td>
        {product.brand} {product.name}
      </td>
      <td>$ {product.price}</td>
      <td>{product.quantity}</td>
    </tr>
  ))

const UserHistoryBlock = ({ products }) => {
  return (
    <div className='history_blocks'>
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{products && renderBlocks(products)}</tbody>
      </table>
    </div>
  )
}

export default UserHistoryBlock
