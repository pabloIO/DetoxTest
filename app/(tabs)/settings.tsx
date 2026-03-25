import { memo, useCallback, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type Button = {
  title: string;
  testID: string;
  onPress: () => void;
};

const UncontrolledInput = () => {
  const [text, setText] = useState<string>('');

  const onChangeTextHandler = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <>
      <TextInput
        testID="input"
        onChangeText={onChangeTextHandler}
        placeholder="Type something..."
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 16,
        }}
      />
      <Text testID="inputValue">{text}</Text>
    </>
  );
};

const Button = memo(({ title, testID, onPress }: Button) => {
  return (
    <Pressable
      testID={testID}
      style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Pressable>
  );
});

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  const onPressHandler = useCallback(() => {
    return setCounter((c) => c + 1);
  }, [counter]);

  const onPressSecondHandler = useCallback(() => {
    return setSecond((c) => c + 1);
  }, [counter]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        testID="counterButton"
        onPress={onPressHandler}
        title="INCREASE ONE"
      />
      <Button
        testID="counterButton"
        onPress={onPressSecondHandler}
        title="INCREASE SECOND"
      />
      <Text testID="counterText">{counter}</Text>
      <Text testID="counterText">{second}</Text>
      <UncontrolledInput />
    </SafeAreaView>
  );
};

export default Counter;
