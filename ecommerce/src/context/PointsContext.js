import React, { createContext, useContext, useState, useCallback } from 'react';
import { getTotalPoints } from '../db/earnings';

const PointsContext = createContext({ total: 0, refreshPoints: () => {} });

export const PointsProvider = ({ children }) => {
  const [total, setTotal] = useState(0);

  const refreshPoints = useCallback(async () => {
    const pts = await getTotalPoints();
    setTotal(pts);
  }, []);

  return (
    <PointsContext.Provider value={{ total, refreshPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);
