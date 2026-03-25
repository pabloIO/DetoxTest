import { memo } from 'react';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import { View, YStack } from 'tamagui';

function GirlLoadingSkeleton() {
  return (
    <AutoSkeletonView isLoading={true}>
      <YStack
        flex={1}
        verticalAlign={'center'}
        justify="center"
        alignItems="center"
        width={'100%'}
      >
        <View
          width={'90%'}
          height={100}
          borderRadius={10}
          backgroundColor="#000"
          marginBottom={10}
        />
        <View
          width={'90%'}
          height={100}
          borderRadius={10}
          backgroundColor="#000"
          marginBottom={10}
        />
        <View
          width={'90%'}
          height={100}
          borderRadius={10}
          backgroundColor="#000"
          marginBottom={10}
        />
        <View
          width={'90%'}
          height={100}
          borderRadius={10}
          backgroundColor="#000"
          marginBottom={10}
        />
        <View
          width={'90%'}
          height={100}
          borderRadius={10}
          backgroundColor="#000"
          marginBottom={10}
        />
        <View
          width={'90%'}
          height={100}
          borderRadius={10}
          backgroundColor="#000"
          marginBottom={10}
        />
      </YStack>
    </AutoSkeletonView>
  );
}

export default memo(GirlLoadingSkeleton);
