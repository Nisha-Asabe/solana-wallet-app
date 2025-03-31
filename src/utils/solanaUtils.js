import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import {
  createMint,
  mintTo,
  transfer,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

export const createToken = async (payer) => {
  const mint = await createMint(connection, payer, payer, null, 9);
  return mint;
};

export const mintTokens = async (mint, owner, amount) => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    owner,
    mint,
    owner
  );
  await mintTo(connection, owner, mint, tokenAccount.address, owner, amount);
};

export const sendTokens = async (mint, recipient, sender, amount) => {
  const senderAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mint,
    sender
  );
  const recipientAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mint,
    recipient
  );
  await transfer(
    connection,
    sender,
    senderAccount.address,
    recipientAccount.address,
    sender,
    amount
  );
};
