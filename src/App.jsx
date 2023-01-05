import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Show from './components/Show'
import Create from './components/Create'
import Edit from './components/Edit'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Show /> } />
          <Route path='/create' element={ <Create /> } />
          <Route path='/edit/:id' element={ <Edit /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
