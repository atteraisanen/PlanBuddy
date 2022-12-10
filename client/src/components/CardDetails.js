import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const CardDetails = ({ card }) => {
  //Get time until due date
  const timeUntilDue = formatDistanceToNow(new Date(card.date), { addSuffix: true })
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

  const handleMove = async () => {
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

  return (
    <div className="card-details">
      <h4>{card.title}</h4>
      <p>Due {timeUntilDue}</p>
      <span id="span1" className="material-symbols-outlined" onClick={handleDelete}>DELETE</span>
      <span id="span2" className="material-symbols-outlined" onClick={handleMove}>➜</span>
      <p>Priority {card.priority}</p>
    </div>
  )
}

export default CardDetails