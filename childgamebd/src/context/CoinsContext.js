import React, { createContext, useContext, useState, useCallback } from 'react';
import { getTotalCoins } from '../db/coins';

const CoinsContext = createContext({ total: 0, refreshCoins: () => {} });

export const CoinsProvider = ({ children }) => {
  const [total, setTotal] = useState(0);

  const refreshCoins = useCallback(async () => {
    const c = await getTotalCoins();
    setTotal(c);
  }, []);

  return (
    <CoinsContext.Provider value={{ total, refreshCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
