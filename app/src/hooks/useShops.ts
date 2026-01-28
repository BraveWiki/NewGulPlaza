// src/hooks/useShops.ts
import { useState, useEffect, useCallback } from 'react';
import { shopService } from '@/services/shopService';
import type { Shop } from '@/types';

export const useShops = (filters?: Parameters<typeof shopService.getShops>[0]) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShops = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shopService.getShops(filters);
      setShops(data);
    } catch (err) {
      setError('Failed to fetch shops');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters?.category, filters?.city, filters?.search, filters?.featured]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  return { shops, loading, error, refetch: fetchShops };
};

export const useShop = (shopId: string) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      if (!shopId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await shopService.getShopById(shopId);
        setShop(data);
      } catch (err) {
        setError('Failed to fetch shop');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopId]);

  return { shop, loading, error };
};
