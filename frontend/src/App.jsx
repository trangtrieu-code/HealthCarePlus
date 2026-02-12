import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Doctors from './pages/Doctors.jsx'
import Contact from './pages/Contact.jsx'
import Appointment from './pages/Appointment.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <AppContextProvider>
      <div className="mx-4 sm:mx-[10%] min-h-screen flex flex-col">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  )
}

export default App