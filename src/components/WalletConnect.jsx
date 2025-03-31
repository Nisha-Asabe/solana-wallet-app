import React, { useEffect, useState } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnect = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const connection = new Connection(clusterApiUrl(WalletAdapterNetwork.Devnet));
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1e9);
      }
    };
    fetchBalance();
  }, [publicKey]);

  return (
    <div className="wallet-container">
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>
      {publicKey && (
        <p>Wallet: {publicKey.toBase58()} | Balance: {balance} SOL</p>
      )}
    </div>
  );
};

export default WalletConnect;
