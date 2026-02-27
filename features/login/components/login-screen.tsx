// app/(auth)/login.tsx
import { useAuthStore } from '@/store/auth-store';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Button, H1, Input, Text, XStack, YStack } from 'tamagui';
// import { useLogin } from '@/hooks/use-login';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const { handleLogin, isLoading, error } = useLogin();
  const { login } = useAuthStore();

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
        <Input
          testID="password-input"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          size="$4"
        />
      </YStack>

      {/* Error */}
      {/* {error && (
        <Text color="$red10" testID="login-error">
          {error}
        </Text>
      )} */}

      {/* Submit */}
      <Button
        testID="login-button"
        size="$4"
        onPress={() => login({ id: '1', token: 'randomtoken', email })}
        // disabled={isLoading}
        // icon={isLoading ? <Spinner /> : undefined}
      >
        {/* {isLoading ? 'Signing in...' : 'Sign in'} */}
        Sign in
      </Button>

      {/* Footer */}
      <XStack justify="center" gap="$2">
        <Text>Don't have an account?</Text>
        <Link href="/sign-in" asChild>
          <Text color="$blue10" fontWeight="bold">
            Register
          </Text>
        </Link>
      </XStack>
    </YStack>
  );
}
