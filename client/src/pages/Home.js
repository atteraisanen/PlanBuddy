import { useEffect }from 'react'
import { useCardsContext } from "../hooks/useCardsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import CardDetails from '../components/CardDetails'
import CardForm from '../components/CardForm'

const API_URL=process.env.REACT_APP_API_URL;

const Home = () => {
  const {cards, dispatch} = useCardsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch(API_URL + '/cards/', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CARDS', payload: json})
      }
    }

    if (user) {
      fetchCards()
    }
  }, [dispatch, user])

  return (
    <div className='pages'>
    <div className="lists-container">
      
      <div className="list">
        <div className='todo'>
          <h3 className='list-title'>To do</h3>
        {cards && cards.map((card) => (
          card.priority === 0 ? <CardDetails key={card.title} card={card} /> : null
        ))}
        </div>
        <div className='doing'>
        <h3 className='list-title'>Doing</h3>
        {cards && cards.map((card) => (
          card.priority === 1 ? <CardDetails key={card.title} card={card} /> : null
        ))}
        </div>
        <div className='done'>
        <h3 className='list-title'>Done</h3>
        {cards && cards.map((card) => (
          card.priority === 2 ? <CardDetails key={card.title} card={card} /> : null
        ))}
        </div>
      </div>
      <CardForm />
    </div>
    </div>
  )
}

export default Home