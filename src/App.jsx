import { useState } from 'react'

import './App.css'
import ProductDetailsFromApi from './components/ProductDetailsFromApi'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-[100%]'>
     <ProductDetailsFromApi/>
    </div>
  )
}

export default App
