import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { authRepository } from '@/repositories/auth-repository';
import { useAuthStore } from '@/store/auth-store';
import { Button } from 'tamagui';

const data = [
  {
    id: 0,
    title: 'one',
  },
  {
    id: 1,
    title: 'two',
  },
  {
    id: 2,
    title: 'three',
  },
  {
    id: 3,
    title: 'four',
  },
  {
    id: 4,
    title: 'five',
  },
];

export default function HomeScreen() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    authRepository.logout();
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" testID="welcome">
          Welcome!
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <Button testID="logout-button" onPress={handleLogout}>
        Log out
      </Button>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
          to see changes. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{' '}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
          directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
        <TouchableOpacity
          testID="parentView"
          onPress={() => alert('List View')}
          style={{ padding: 20 }}
        >
          {data.map((e) => (
            <Text
              accessibilityLabel="listItem"
              onPress={() => alert(`alert text ${e.title}`)}
              key={e.id}
            >
              {e.title}
            </Text>
          ))}
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
