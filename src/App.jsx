import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import GamePage from './pages/GamePage.jsx';
import Footer from './components/Footer.jsx';
import LocomotiveScroll from 'locomotive-scroll';

import { useGLTF } from "@react-three/drei";
useGLTF.preload("/ChessBoardModel/boardModel.gltf");
useGLTF.preload("/ChessQueenModel/scene.gltf");
import("./components/ChessBoardModel.jsx");

function App() {
  
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <div className='bg-slate-950'>
      <div className="min-h-screen h-fit mb-8 max-sm:h-full bg-slate-950 ">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/game" element={<GamePage/>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer/>
    </div>
  )
}

export default App
