"use client";

import React, { createContext, useState, useEffect } from 'react';
import { User, FarmerProfile, Crop, LoanApplication, GovernmentScheme, MandiPrice, Weather, Soil, Fertilizer } from '@/lib/types';
import initialUsers from '@/data/users.json';
import initialFarmers from '@/data/farmers.json';
import initialCrops from '@/data/crops.json';
import initialLoans from '@/data/loans.json';
import initialSchemes from '@/data/schemes.json';
import initialMandiPrices from '@/data/mandi_prices.json';
import initialWeather from '@/data/weather.json';
import initialSoils from '@/data/soil.json';
import initialFertilizers from '@/data/fertilizers.json';
import initialPriceTrends from '@/data/price-trends.json';
import initialHistoricalPrices from '@/data/historical-price-trends.json';
import initialPerformance from '@/data/performance.json';
import initialRainfall from '@/data/rainfall.json';
import initialWeatherForecast from '@/data/weather-forecast.json';

type DataStore = {
  users: User[];
  farmers: FarmerProfile[];
  crops: Crop[];
  loans: LoanApplication[];
  schemes: GovernmentScheme[];
  mandi_prices: MandiPrice[];
  weather: Weather[];
  soil: Soil[];
  fertilizers: Fertilizer[];
  priceTrends: typeof initialPriceTrends;
  historicalPriceTrends: typeof initialHistoricalPrices;
  performance: typeof initialPerformance;
  rainfall: typeof initialRainfall;
  weatherForecast: typeof initialWeatherForecast;
};

interface DataContextType {
  data: DataStore;
  setData: (key: keyof DataStore, value: any) => void;
  loading: boolean;
}

const DATA_STORAGE_KEY = 'agro-wise-data';

const initialData: DataStore = {
    users: initialUsers.users,
    farmers: initialFarmers.farmers,
    crops: initialCrops.crops,
    loans: initialLoans.applications,
    schemes: initialSchemes.schemes,
    mandi_prices: initialMandiPrices.prices,
    weather: initialWeather.weather,
    soil: initialSoils.soils,
    fertilizers: initialFertilizers.fertilizers,
    priceTrends: initialPriceTrends,
    historicalPriceTrends: initialHistoricalPrices,
    performance: initialPerformance,
    rainfall: initialRainfall,
    weatherForecast: initialWeatherForecast,
};

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setDataState] = useState<DataStore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(DATA_STORAGE_KEY);
      if (storedData) {
        setDataState(JSON.parse(storedData));
      } else {
        localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(initialData));
        setDataState(initialData);
      }
    } catch (error) {
      console.error("Failed to process data from localStorage", error);
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(initialData));
      setDataState(initialData);
    } finally {
      setLoading(false);
    }
  }, []);

  const setData = (key: keyof DataStore, value: any) => {
    if (data) {
        const newData = { ...data, [key]: value };
        setDataState(newData);
        localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(newData));
    }
  };
  
  if (loading || !data) {
    return null;
  }

  return (
    <DataContext.Provider value={{ data, setData, loading }}>
      {children}
    </DataContext.Provider>
  );
};
