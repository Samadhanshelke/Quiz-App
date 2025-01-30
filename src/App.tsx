

import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'

function App() {
  const [start,setStart] = useState(false)

  return (
  <div className='h-full  w-full  flex items-center justify-center'>
    {
      start ? (
       <Quiz/>
      ):(
        <div className='h-screen flex items-center'>
          <button className='bg-blue-500 h-fit py-2 px-6 flex items-center text-white rounded-lg hover:bg-blue-600 cursor-pointer' onClick={()=>setStart(true)}>Start Quiz</button>

        </div>
      )
    }
  </div>
  )
}

export default App
