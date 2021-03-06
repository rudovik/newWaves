import React from 'react'
import UserLayout from '../../hoc/UserLayout'
import MyButton from '../utils/Button'
import UserHistoryBlock from '../utils/User/UserHistoryBlock'

const UserDashboard = ({ user: { name, lastname, email, history } }) => {
  return (
    <UserLayout>
      <div>
        <div className='user_nfo_panel'>
          <h1>User information</h1>
          <div>
            <span>{name}</span>
            <span>{lastname}</span>
            <span>{email}</span>
          </div>
          <MyButton
            type='default'
            title='Edit account info'
            linkTo='/user/user_profile'
          />
        </div>
        {history && (
          <div className='user_nfo_panel'>
            <h1>History purchases</h1>
            <div className='user_product_block_wrapper'>
              <UserHistoryBlock products={history} />
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  )
}

export default UserDashboard
