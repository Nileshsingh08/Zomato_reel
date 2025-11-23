import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { increment, decrement } from './features/counter/counterSlice'

function App() {
  const count =  useSelector((state)=>state.counter.value)
  const dispatch = useDispatch();

  function handleDecrement(){
    dispatch(decrement());
  }

  function handleIncrement(){
    dispatch(increment());
  }
  
  return (
    
      <div className='container'>
        <button onClick={handleIncrement}>+</button>
        {count}
        <button onClick={handleDecrement}>-</button>
    </div>
  
  )
}

export default App
