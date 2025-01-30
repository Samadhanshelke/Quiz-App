

import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'

function App() {
  const [start,setStart] = useState(true)

  return (
  <div className='h-full  w-full  flex items-center justify-center'>
    {
      start ? (
       <Quiz/>
      ):(

        <button className='bg-lime-400 py-2 px-4 rounded-lg hover:bg-lime-200 cursor-pointer' onClick={()=>setStart(true)}>Start Quiz</button>
      )
    }
  </div>
  )
}

export default App
