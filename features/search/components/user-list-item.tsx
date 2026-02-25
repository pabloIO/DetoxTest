import { User } from '@/app/(tabs)/search';
import { memo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  LinearTransition,
  SlideOutRight,
} from 'react-native-reanimated';
import RightSwipeActions from './right-swipe-actions';

type UserListItemProps = User & {
  onDelete: (id: string) => void;
};

const UserListItem = memo(
  ({ name, username, id, onDelete }: UserListItemProps) => {
    const handleDelete = useCallback(() => onDelete(id), [onDelete, id]);

    return (
      <Animated.View
        layout={LinearTransition.springify()}
        exiting={SlideOutRight.springify()}
      >
        <Swipeable
          renderRightActions={(progress, translation) => (
            <RightSwipeActions
              onDelete={() => handleDelete()}
              progress={progress}
              translation={translation}
              id={name}
            />
          )}
        >
          <View style={styles.itemContainer}>
            <Text>{name}</Text>
            <Text>{username}</Text>
          </View>
        </Swipeable>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    height: 60,
  },
});

export default UserListItem;
