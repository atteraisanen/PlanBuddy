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
    <div className="home">
      <div className="workouts">
        {cards && cards.map((card) => (
          <CardDetails key={card._id} card={card} />
        ))}
        
      </div>
      <CardForm />
    </div>
  )
}

export default Home