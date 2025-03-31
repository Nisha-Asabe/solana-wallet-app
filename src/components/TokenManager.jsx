import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { createToken, mintTokens, sendTokens } from '../utils/solanaUtils';
import { useWallet } from '@solana/wallet-adapter-react';

const TokenManager = () => {
  const { publicKey } = useWallet();
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleCreateToken = async () => {
    if (!publicKey) return alert('Connect wallet first!');
    const token = await createToken(publicKey);
    setTokenAddress(token.toBase58());
  };

  const handleMintTokens = async () => {
    if (!publicKey || !tokenAddress) return alert('Invalid details!');
    await mintTokens(new PublicKey(tokenAddress), publicKey, Number(amount));
  };

  const handleSendTokens = async () => {
    if (!publicKey || !recipient || !amount) return alert('Fill all fields!');
    await sendTokens(new PublicKey(tokenAddress), new PublicKey(recipient), publicKey, Number(amount));
  };

  return (
    <div className="token-manager">
      <button onClick={handleCreateToken}>Create Token</button>
      {tokenAddress && <p>Token Address: {tokenAddress}</p>}

      <input type="text" placeholder="Amount to Mint" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleMintTokens}>Mint Tokens</button>

      <input type="text" placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
      <button onClick={handleSendTokens}>Send Tokens</button>
    </div>
  );
};

export default TokenManager;
