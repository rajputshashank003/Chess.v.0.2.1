import { Keypair, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Connection } from "@solana/web3.js";
import bs58 from "bs58";

export async function sendWinnerAmount(sol, wallet) {
    try {
        const connection = new Connection("https://api.devnet.solana.com", { commitment: "confirmed" });
        const base58PrivateKey = import.meta.env.VITE_PRIVATE_KEY;
        const secretKeyUint8Array = bs58.decode(base58PrivateKey);
        const fromKeypair = Keypair.fromSecretKey(secretKeyUint8Array);

        const lamports = BigInt(Math.floor(sol * LAMPORTS_PER_SOL));
        console.log(lamports, sol);

        const ix = SystemProgram.transfer({
            fromPubkey: fromKeypair.publicKey,
            toPubkey : wallet.publicKey,
            lamports
        });

        const tx = new Transaction().add(ix);
        const { blockhash , lastValidBlockHeight  } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;
        tx.feePayer = fromKeypair.publicKey;
        tx.sign(fromKeypair);

        const signature = await connection.sendTransaction(tx, [fromKeypair]);

        await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");

        console.log("Transaction Signature:", signature);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}
