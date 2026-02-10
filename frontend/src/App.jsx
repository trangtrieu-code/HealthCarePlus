import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
