import { useState } from 'react'
import './App.css'
import Categories from './components/Categories'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Categories/>
    </>
  )
}

export default App
