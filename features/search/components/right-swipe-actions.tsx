import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type RightActionsProps = {
  progress: SharedValue<number>;
  translation: SharedValue<number>;
  onDelete: () => void;
  id: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RightSwipeActions = ({
  progress,
  translation,
  onDelete,
  id,
}: RightActionsProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [100, 0]);

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <AnimatedPressable
      onPress={onDelete}
      testID={`delete-user-${id}`}
      style={[styles.deleteButton, animatedStyle]}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    width: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderWidth: 1,
    borderTopColor: 'gray',
  },
  deleteText: { color: 'white', fontWeight: 'bold' },
});

export default RightSwipeActions;
