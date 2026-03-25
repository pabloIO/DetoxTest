import { memo } from 'react';
import { Text } from 'tamagui';

function GirlEmpty() {
  return (
    <Text textAlignVertical="center" fontSize={20} color="#000">
      You have not added any girl you dated yet. Click here to add one
    </Text>
  );
}

export default memo(GirlEmpty);
