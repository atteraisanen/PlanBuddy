import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const CardDetails = ({ card }) => {
  //Add 23 hours and 59 minutes to the due date
  const dueDate = new Date(card.date)
  dueDate.setHours(0)
  dueDate.setHours(dueDate.getHours() + 23)
  dueDate.setMinutes(dueDate.getMinutes() + 59)
  //Get time until due date
  const timeUntilDue = formatDistanceToNow(dueDate, { addSuffix: true })
  const { dispatch } = useCardsContext()
  const { user } = useAuthContext()

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch(API_URL  + '/cards/' + card._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CARD', payload: json})
    }
  }

  const handleMoveRight = async () => {
    if (!user) {
      return
    }

    //Send a PUT request to update the priority
    const response = await fetch(API_URL + '/cards/' + card._id, {
      method: 'PUT',
      body: JSON.stringify({priority: card.priority + 1}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_CARD', payload: json})
      console.log(json.priority)
      console.log(json.title)
    }
  }

  const handleMoveLeft = async () => {
    if (!user) {
      return
    }

    //Send a PUT request to update the priority
    const response = await fetch(API_URL + '/cards/' + card._id, {
      method: 'PUT',
      body: JSON.stringify({priority: card.priority - 1}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_CARD', payload: json})
      console.log(json.priority)
      console.log(json.title)
    }
  }

  return (
    <div className="list-items">
      <li>
      <h4>{card.title}</h4>
      <p>Due {timeUntilDue}</p>
      <span id="left" className="material-symbols-outlined" onClick={handleMoveLeft}>🡸</span>
      <span id="delete" className="material-symbols-outlined" onClick={handleDelete}>DELETE</span>
      <span id="right" className="material-symbols-outlined" onClick={handleMoveRight}>🡺</span>
      </li>
    </div>
  )
}

export default CardDetails