import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state)
  console.log('notification:', notification)
  if (notification === null) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div className="notification" style={style}>
      {notification}
    </div>
  )
}

export default Notification