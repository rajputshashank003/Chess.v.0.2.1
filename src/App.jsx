import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import GamePage from './pages/GamePage.jsx';

function App() {

  return (
    <>
      <div className="h-screen max-sm:h-full bg-slate-950 ">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/game" element={<GamePage/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
