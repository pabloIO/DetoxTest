import { useAuthStore } from '@/store/auth-store';
import { config } from '@/tamagui.config';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://cc1fe81c8d47e98e7a81b123d8aced85@o4511033432932352.ingest.us.sentry.io/4511033436209152',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
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
});
