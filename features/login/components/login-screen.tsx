// app/(auth)/login.tsx
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, H1, Input, Spinner, Text, XStack, YStack } from 'tamagui';
import { useLogin } from '../hooks/use-login';
// import { useLogin } from '@/hooks/use-login';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, isLoading, error } = useLogin();

  return (
    <YStack
      flex={1}
      justify={'center'}
      p="$6"
      gap="$4"
      background="$background"
    >
      {/* Header */}
      <YStack gap="$2" mb="$4">
        <H1 testID="login-welcome">Welcome back</H1>
        <Text color="$orange10">Sign in to your account</Text>
      </YStack>

      {/* Form */}
      <YStack gap="$3">
        <Input
          testID="email-input"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          size="$4"
        />
        <XStack height={50} justify="center" alignItems="center">
          <Input
            testID="password-input"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            size="$4"
            height={50}
            flex={1}
          />
          <TouchableOpacity
            testID="show-password-button"
            style={{ position: 'absolute', right: 10 }}
            onPress={() => setShowPassword((b) => !b)}
          >
            {!showPassword ? (
              <AntDesign name="eye" size={24} color="black" />
            ) : (
              <AntDesign name="eye-invisible" size={24} color="black" />
            )}
          </TouchableOpacity>
        </XStack>
      </YStack>

      {/* Error */}
      {error && (
        <Text color="$red10" testID="login-error">
          {error}
        </Text>
      )}

      {/* Submit */}
      <Button
        testID="login-button"
        size="$4"
        onPress={() => handleLogin(email, password)}
        disabled={isLoading}
        icon={isLoading ? <Spinner /> : undefined}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      {/* Footer */}
      <XStack justify="center" gap="$2">
        <Text>Don't have an account?</Text>
        <Link href="/sign-up" asChild>
          <Text color="$blue10" fontWeight="bold">
            Register
          </Text>
        </Link>
      </XStack>

      <XStack justify="center" gap="$2">
        <Text>Test text</Text>
        <Text color="$blue10" fontWeight="bold">
          Register
        </Text>
      </XStack>
    </YStack>
  );
}
