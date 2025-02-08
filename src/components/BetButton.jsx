import React, { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { toast } from 'react-toastify';
import {INIT_GAME } from "./Messages";

const BetButton = ({setSelectBetOverlay,setBetAmount, amount, socket, setFindingPlayer, setBetGame}) => {
    const [selectingAmount , setSelectingAmount] = useState(false);

    const handleSetAmount = async () => {
        setSelectingAmount(true);
        const res = await sendTokens();
        if(!res){
            toast.error("transaction error");
            setSelectingAmount(false);
            return ;
        }
        setBetAmount(amount);
        setSelectBetOverlay(false);
        handlePlayBetButton();
        setSelectingAmount(true);
    }
    const handlePlayBetButton = () => {
        socket.send(JSON.stringify({ 
            type: INIT_GAME, 
            channel : null,
            bet_game : true,
            bet_amount : amount
        }));
        setBetGame(true);
        setFindingPlayer(true);
    }

    const wallet = useWallet();
    const {connection} = useConnection();
    const sendTo = "AjgTYQb3EAxJB3heZWD2kmpBSp7Whu5TJbWkyj2Fr1FS";
    const sol = amount;
    async function sendTokens() {
        const transaction = new Transaction();
        const money =  parseInt(sol * LAMPORTS_PER_SOL);
        try {
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(sendTo),
                lamports: money,
            }));

            await wallet.sendTransaction(transaction, connection);
            toast.success("payment success!");
            return true;
        } catch (err) {
            console.log(err);
            toast.error(err.toString());
            return false;
        }
    }
    return (
        <button disabled={selectingAmount} onClick={handleSetAmount} className='text-xl w-24 rounded-xl cursor-pointer hover:bg-slate-900 duration-200 p-2 flex justify-center items-center bg-slate-950 text-slate-300 '>
            {amount} SOL
        </button>
    )
}

export default BetButton