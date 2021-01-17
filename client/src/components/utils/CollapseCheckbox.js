import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'

const CollapseCheckbox = ({ initState, title, list, handleFilters }) => {
  const [state, setState] = useState({
    open: initState,
  })

  const [checked, setChecked] = useState({})

  const handleToggle = ({ event, id }) => {
    setChecked((checked) => {
      const newChecked = { ...checked }
      newChecked[id] = event.target.checked ? true : false
      handleFilters(newChecked)
      return { ...newChecked }
    })
  }

  const renderList = () =>
    list &&
    list.map((value) => (
      <ListItem key={value._id} style={{ padding: '10px 0' }}>
        <ListItemText primary={value.name} />
        <ListItemSecondaryAction>
          <Checkbox
            color='primary'
            onChange={(event) => {
              handleToggle({ id: value._id, event })
            }}
            checked={checked[value._id] || false}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ))

  // const handleToggle = (id) => {
  //   const { checked } = state
  //   !checked[id] && (checked[id] = true)
  //   // const newChecked = [...checked]

  //   // if (currentIndex === -1) {
  //   //   newChecked.push(value)
  //   // } else {
  //   //   newChecked.splice(currentIndex, 1)
  //   // }
  //   console.log(checked)

  //   // setState({ ...state, checked: newChecked })
  // }

  const handleAngel = () =>
    state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className='icon' />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className='icon' />
    )
  const handleClick = () => {
    setState({ ...state, open: !state.open })
  }
  return (
    <div className='collapse_items_wrapper'>
      <List style={{ borderBottom: '1px solid #dbdbdb' }}>
        <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }}>
          <ListItemText primary={title} className='collapse_title' />
          {handleAngel()}
        </ListItem>
        <Collapse in={state.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {renderList()}
          </List>
        </Collapse>
      </List>
    </div>
  )
}

export default CollapseCheckbox
