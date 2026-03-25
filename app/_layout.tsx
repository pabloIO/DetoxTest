import { useAuthStore } from '@/store/auth-store';
import { config } from '@/tamagui.config';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme="light">
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <Stack>
            <Stack.Protected guard={!!isAuthenticated}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Protected guard={!isAuthenticated}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
          </Stack>
        </SafeAreaView>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
