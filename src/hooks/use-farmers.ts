import { useContext } from 'react';
import { FarmerContext } from '@/context/farmer-context';

export const useFarmers = () => {
  const context = useContext(FarmerContext);
  if (!context) {
    throw new Error('useFarmers must be used within a FarmerProvider');
  }
  return context;
};
