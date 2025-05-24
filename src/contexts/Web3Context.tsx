
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Web3State {
  account: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string;
}

interface Web3ContextType extends Web3State {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [state, setState] = useState<Web3State>({
    account: null,
    isConnected: false,
    chainId: null,
    balance: '0',
  });

  const connect = async () => {
    // Mock connection for demo
    setState({
      account: '0x1234...5678',
      isConnected: true,
      chainId: 1,
      balance: '1.25',
    });
  };

  const disconnect = () => {
    setState({
      account: null,
      isConnected: false,
      chainId: null,
      balance: '0',
    });
  };

  const switchNetwork = async (chainId: number) => {
    setState(prev => ({ ...prev, chainId }));
  };

  const value: Web3ContextType = {
    ...state,
    connect,
    disconnect,
    switchNetwork,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
