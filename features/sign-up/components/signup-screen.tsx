// app/(auth)/login.tsx
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, H1, Input, Spinner, Text, XStack, YStack } from 'tamagui';
import { useRegister } from '../hooks/use-register';

export default function SignUpScreen() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignUp, error, isLoading } = useRegister();

  const handleUserInput = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

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
        <H1 testID="login-welcome">Register</H1>
        <Text color="$orange10">Create a new account</Text>
      </YStack>

      {/* Form */}
      <YStack gap="$3">
        <Input
          testID="email-input"
          placeholder="Email"
          value={userData.email}
          onChangeText={(value) => handleUserInput('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          size="$4"
        />
        <XStack height={50} justify="center" alignItems="center">
          <Input
            testID="password-input"
            placeholder="Password"
            value={userData.password}
            onChangeText={(value) => handleUserInput('password', value)}
            secureTextEntry={!showPassword}
            size="$4"
            flex={1}
            paddingEnd={50}
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
        testID="register-button"
        size="$4"
        onPress={() => handleSignUp(userData.email, userData.password)}
        disabled={isLoading}
        icon={isLoading ? <Spinner /> : undefined}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </Button>

      {/* Footer */}
      <XStack justify="center" gap="$2">
        <Text>Already have an account?</Text>
        <Link href="/login" asChild>
          <Text color="$blue10" fontWeight="bold">
            Sign in
          </Text>
        </Link>
      </XStack>
    </YStack>
  );
}
