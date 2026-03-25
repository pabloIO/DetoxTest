import GirlContainer from '@/features/girls/components/girl-container';
import { authRepository } from '@/repositories/auth-repository';
import { useAuthStore } from '@/store/auth-store';

export default function HomeScreen() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    authRepository.logout();
  };
  return <GirlContainer />;
}
