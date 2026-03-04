import { authRepository } from '@/repositories/auth-repository';
import { useAuthStore } from '@/store/auth-store';
import { useState } from 'react';

export const useLogin = () => {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authRepository.login({ email, password });
      await login(user); // update the store
    } catch (e) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};
