"use client";
import { useConnect, useDisconnect, useAccount } from '@starknet-react/core';
import { useMemo } from 'react';
import { Button } from './ui/Button';

function WalletConnected() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div>
      <span>Connected: {shortenedAddress} </span>
      <button
        className="bg-blue border border-black hover:bg-green-900 font-regular py-2 px-4"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();

  return (
    <div>
      <span>Choose a wallet: </span>
      {connectors.map((connector) => {
        // Define button styles based on connector id
        const buttonStyles = connector.id === 'braavos'
          ? 'bg-blue-700 hover:bg-blue-500'
          : 'bg-red-700 hover:bg-red-500';
        return (
          <Button
            key={connector.id}
            onClick={() => connect({ connector })}
            className={`gap-x-2 mr-2 border border-black font-regular py-2 px-4 ${buttonStyles}`}
          >
            {connector.id}
          </Button>
        );
      })}
    </div>
  );
}

export default function WalletBar() {
  const { address } = useAccount();

  return (
    <div className="wallet-bar-container">
      {address ? <WalletConnected /> : <ConnectWallet />}
    </div>
  );
}