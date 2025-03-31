import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css"; // ✅ Correct Import

const WalletConnect = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(null); // ✅ Handle null balance

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      try {
        const connection = new Connection(clusterApiUrl("devnet")); // ✅ Always use "devnet"
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [publicKey]);

  return (
    <div className="wallet-container">
      <WalletMultiButton />
      {publicKey ? (
        <p>
          Wallet: {publicKey.toBase58()} | Balance: {balance !== null ? balance : "Loading..."} SOL
        </p>
      ) : (
        <p>Connect your wallet</p>
      )}
    </div>
  );
};

export default WalletConnect;
