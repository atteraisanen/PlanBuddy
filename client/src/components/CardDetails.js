import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const CardDetails = ({ card }) => {
  //Get time until due date
  const timeUntilDue = formatDistanceToNow(new Date(card.date), { addSuffix: true })
  const { dispatch } = useCardsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
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

  return (
    <div className="workout-details">
      <h4>{card.title}</h4>
      <p>Due {timeUntilDue}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default CardDetails