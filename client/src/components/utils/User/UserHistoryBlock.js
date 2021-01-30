import React from 'react'
// import moment from 'moment'

/* <td>{moment(product.dateOfPurchases).format('MM-DD-YYYY')}</td> */

const renderBlocks = (products) =>
  products.map((product, i) => (
    <tr key={i}>
      <td>{product.pOrder}</td>
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
            <th>Order number</th>
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
