import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { updateGoal } from '../features/goals/goalSlice';
import { toast } from 'react-toastify';

const EditGoal = () => {
  const location = useLocation(); 
  const goal = {
    id: location.state?.id,
    text: location.state?.text
  }

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {   isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
 
    const [text,setText] = useState(''); 
 

    useEffect(() => {
        // if (isError) {
        //     console.log(message); 
        //   }
            
         if(!goal.text || !goal.id) {
          navigate('/')
         }

          if (!user) {
            navigate("/login");
          }
        if(goal.text) {
            setText(goal.text);
        }
    },[isError,user,message,navigate,goal.text,isLoading,goal.id])
 


    const onSubmit = (e) => {
  
        e.preventDefault(); 
        if(text.trim() === "") {
         toast.error('Please Enter the Updated Goal', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
         return;
        }  
        goal.text = text  
        dispatch(updateGoal(goal)); 
        setText('')  

          toast.success('Goal Updated... Redirecting', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
         setTimeout(nav,2000)
         function nav() {
          navigate('/')
        }
    }

    

    if(isLoading) {
        return <Spinner />
    }


  return (
    <>
    <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

        <section className='form'>
        <form onSubmit={onSubmit}>
        <div className='form-group'>
            <label htmlFor='text'>Edit Exiting Goal</label>
            <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div className='form-group'>
            <button className='btn btn-block' type='submit'>
            Update Goal
            </button>
        </div>
        </form>
        </section>
</>
  )
}

export default EditGoal