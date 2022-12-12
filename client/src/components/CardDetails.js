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

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(card.title)

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
    if(card.priority !== 2) {
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
  }
  const handleMoveLeft = async () => {
    if (!user) {
      return
    }
    if (card.priority !== 0) {
      const response = await fetch(API_URL + '/cards/' + card._id, {
        method: 'PUT',
        body: JSON.stringify({ priority: card.priority - 1 }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'UPDATE_CARD', payload: json })
        console.log(json.priority)
        console.log(json.title)
      }
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }

    const response = await fetch(API_URL + '/cards/' + card._id, {
      method: 'PUT',
      body: JSON.stringify({ title: title }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'UPDATE_CARD', payload: json})
      console.log(json.title)
    }
  }

  const CardTitle = () => {
    return editMode
    ?  
    <div>
      <form onSubmit={handleEdit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button type="submit">Save</button>
      </form>
    </div>
    :
    <div>
      <h4 onClick={changeEditMode}>{title}</h4>
    </div>
  }

  const changeEditMode = async () => {
    console.log("Should change edit mode")
    setEditMode(!editMode)
  }


  return (
    <div className="list-items">
      <li>
      <CardTitle />
      <p>Due {timeUntilDue}</p>
      <span id="left" className="material-symbols-outlined" onClick={handleMoveLeft}>ARROW_BACK</span>
      <span id="delete" className="material-symbols-outlined" onClick={handleDelete}>DELETE</span>
      <span id="right" className="material-symbols-outlined" onClick={handleMoveRight}>ARROW_FORWARD</span>
      </li>
    </div>
  )
}

export default CardDetails