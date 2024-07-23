import React from 'react'
import Navbar from '../components/Navbar'
import Section from '../components/Banner'
import '../styles/styles.css'

function Home() {
  return (
    <>
      <Navbar />
      <div className='body'>
        <Section />
      </div>
    </>
  )
}

export default Home;