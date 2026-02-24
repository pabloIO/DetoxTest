import { memo, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

const UserListItem = memo(({ name, username }: User) => {
  return (
    <View
      style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
    >
      <Text>{name}</Text>
      <Text>{username}</Text>
    </View>
  );
});

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Button
          testID="counterButton"
          onPress={() => setCounter((c) => c + 1)}
          title="INCREASE"
        />
        <Text testID="counterText">{counter}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Counter;
