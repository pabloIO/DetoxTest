import { Girl } from '@/models/Girl';
import { girlsRepository } from '@/repositories/girls-repository';
import { useCallback, useState } from 'react';

export const useGirls = () => {
  const [girls, setGirls] = useState<Girl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGirls = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await girlsRepository.getAll();
      setGirls(data);
    } catch (e) {
      setError('Failed to fetch girls');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createGirl = useCallback(
    async (input: Omit<Girl, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
      setIsLoading(true);
      setError(null);
      try {
        const newGirl = await girlsRepository.create(input);
        setGirls((prev) => [newGirl, ...prev]);
        return newGirl;
      } catch (e) {
        setError('Failed to create girl');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateGirl = useCallback(async (id: string, input: Partial<Girl>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await girlsRepository.update(id, input);
      setGirls((prev) => prev.map((g) => (g.id === id ? updated : g)));
      return updated;
    } catch (e) {
      setError('Failed to update girl');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteGirl = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await girlsRepository.delete(id);
      setGirls((prev) => prev.filter((g) => g.id !== id));
    } catch (e) {
      setError('Failed to delete girl');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    girls,
    isLoading,
    error,
    fetchGirls,
    createGirl,
    updateGirl,
    deleteGirl,
  };
};
