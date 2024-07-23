import React from 'react'
import Navbar from './components/Navbar'
import Section from './components/Banner'
import './styles.css'

function App() {
  return (
    <>
      <Navbar />
      <div className='body'>
        <Section />
      </div>
    </>
  )
}

export default App