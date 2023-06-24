import { useDispatch } from 'react-redux'
import { deleteGoal  } from '../features/goals/goalSlice'
import { Link } from 'react-router-dom' 

function GoalItem({ goal }) {
  const dispatch = useDispatch() 

 
  return (
    <div className='goal'> 
      <>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2 >{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
  
      <Link key={goal._id} className='edit-btn' to="/editGoal" state={{ id: goal._id, text: goal.text }}>Edit</Link>
 
 
      </>
        
    </div>
  )
}

export default GoalItem
