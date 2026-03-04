import { authRepository } from '@/repositories/auth-repository';
import { useAuthStore } from '@/store/auth-store';
import { useState } from 'react';

export const useRegister = () => {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authRepository.register({ email, password });
      await login(user); // update the store
    } catch (e) {
      setError(String(e) || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignUp, isLoading, error };
};
