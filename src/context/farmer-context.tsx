"use client";

import React, { createContext, useState, useCallback } from 'react';
import type { FarmerProfile } from '@/lib/types';
import initialFarmerData from '@/data/farmers.json';

interface FarmerContextType {
  farmers: FarmerProfile[];
  updateFarmer: (updatedFarmer: FarmerProfile) => void;
  setFarmers: React.Dispatch<React.SetStateAction<FarmerProfile[]>>;
}

export const FarmerContext = createContext<FarmerContextType | null>(null);

export const FarmerProvider = ({ children }: { children: React.ReactNode }) => {
  const [farmers, setFarmers] = useState<FarmerProfile[]>(initialFarmerData.farmers);

  const updateFarmer = useCallback((updatedFarmer: FarmerProfile) => {
    setFarmers(prevFarmers => 
      prevFarmers.map(f => f.id === updatedFarmer.id ? updatedFarmer : f)
    );
  }, []);

  return (
    <FarmerContext.Provider value={{ farmers, updateFarmer, setFarmers }}>
      {children}
    </FarmerContext.Provider>
  );
};
