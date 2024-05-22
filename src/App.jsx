import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WebLayout from "./web/Layout"
import Homepage from "./web/pages/Homepage"

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<WebLayout />}>
            <Route index element={<Homepage />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
