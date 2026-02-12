import React, { createContext, useState } from 'react'
import { doctors as doctorsData } from '../assets/assets.js'

export const AppContext = createContext({
  doctors: [],
  setDoctors: () => {},
  currencySymbol: '$',
})

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState(doctorsData)

  // Single source of truth for currency: easy to switch locale (e.g. CAD, EUR)
  // or change symbol in one place for all fee displays across the app.
  const currencySymbol = '$'

  const value = {
    doctors,
    setDoctors,
    currencySymbol,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider