import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const CollapseRadio = ({ initState, title, list, handleFilters }) => {
  const [state, setState] = useState({
    open: initState || false,
    value: 0,
  })

  const handleAngel = () =>
    state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className='icon' />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className='icon' />
    )
  const handleClick = () => {
    setState({ ...state, open: !state.open })
  }
  const renderList = () =>
    list &&
    list.map((item) => (
      <FormControlLabel
        key={item._id}
        value={`${item._id}`}
        control={<Radio />}
        label={item.name}
      />
    ))

  const handleChange = (event) => {
    handleFilters(event.target.value)
    setState({ ...state, value: event.target.value })
  }
  return (
    <div>
      <List style={{ borderBottom: '1px solid #dbdbdb' }}>
        <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }}>
          <ListItemText primary={title} className='collapse_title' />
          {handleAngel()}
        </ListItem>
        <Collapse in={state.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <RadioGroup
              aria-label='prices'
              name='prices'
              value={state.value}
              onChange={handleChange}
            >
              {renderList()}
            </RadioGroup>
          </List>
        </Collapse>
      </List>
    </div>
  )
}

export default CollapseRadio
