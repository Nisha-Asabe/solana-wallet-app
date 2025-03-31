import React from 'react';
import WalletConnect from './components/WalletConnect';
import TokenManager from './components/TokenManager';
import TransactionHistory from './components/TransactionHistory';
import './styles/global.css';

function App() {
  return (
    <div className="app-container">
      <h1>Solana Wallet App</h1>
      <WalletConnect />
      <TokenManager />
      <TransactionHistory />
    </div>
  );
}

export default App;
