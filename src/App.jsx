import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import GamePage from './pages/GamePage.jsx';
import Footer from './components/Footer.jsx';
import LocomotiveScroll from 'locomotive-scroll';

import { useGLTF } from "@react-three/drei";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
useGLTF.preload("/ChessBoardModel/boardModel.gltf");
useGLTF.preload("/ChessQueenModel/scene.gltf");
import("./components/ChessBoardModel.jsx");

import "@solana/wallet-adapter-react-ui/styles.css";
import { SocketProvider } from './hooks/useSocket.jsx';

function App() {
  
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <div className='bg-slate-950'>
      <div className="min-h-screen h-fit mb-8 max-sm:h-full bg-slate-950 ">
        <SocketProvider>
          <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
            <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <BrowserRouter >
                  <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/game" element={<GamePage/>} />
                  </Routes>
                </BrowserRouter>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </SocketProvider>
      </div>
      <Footer/>
    </div>
  )
}

export default App
