import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Doctors from './pages/Doctors.jsx'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
