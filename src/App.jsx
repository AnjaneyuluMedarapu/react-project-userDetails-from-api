import { useState } from 'react'

import './App.css'
import UserDetailsFromApi from './components/UserDetailsFromApi'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-[100%]'>
     <UserDetailsFromApi/>
    </div>
  )
}

export default App
