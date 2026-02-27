import { useAuthStore } from '@/store/auth-store';
import { config } from '@/tamagui.config';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLoading, isAuthenticated, loadSession } = useAuthStore();

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync(); // hide splash once session is resolved
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Stack>
        <Stack.Protected guard={!!isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </TamaguiProvider>
  );
}
