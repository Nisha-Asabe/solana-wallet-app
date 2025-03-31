import React, { useEffect, useState } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const TransactionHistory = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!publicKey) return;
      const connection = new Connection(clusterApiUrl('devnet'));
      const txs = await connection.getSignaturesForAddress(publicKey);
      setTransactions(txs.slice(0, 5)); // Get last 5 transactions
    };

    fetchTransactions();
  }, [publicKey]);

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>{tx.signature}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
