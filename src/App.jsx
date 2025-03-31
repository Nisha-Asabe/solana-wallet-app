import React from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import WalletConnect from "./components/WalletConnect";
import TokenManager from "./components/TokenManager";
import TransactionHistory from "./components/TransactionHistory";
import "./styles/global.css";

const App = () => {
  const endpoint = clusterApiUrl("devnet"); // Use "mainnet-beta" for production
  const wallets = [new PhantomWalletAdapter()]; // Add more wallets if needed

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="app-container">
            <h1>Solana Wallet App</h1>
            <WalletConnect />
            <TokenManager />
            <TransactionHistory />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
