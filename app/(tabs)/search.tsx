import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  LinearTransition,
  SlideOutRight,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

type UserListItemProps = User & {
  onDelete: (id: string) => void;
};

type RightActionsProps = {
  progress: SharedValue<number>;
  translation: SharedValue<number>;
  onDelete: () => void;
  id: string;
};

type SearchHeaderProps = {
  search: string;
  onChangeText: (text: string) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SearchHeader = memo(({ search, onChangeText }: SearchHeaderProps) => {
  return (
    <TextInput
      testID="searchNames"
      value={search}
      onChangeText={onChangeText}
      placeholder="Search users name"
      style={styles.searchInput}
    />
  );
});

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

const keyExtractor = (item: User) => item.id;

const FilterList = () => {
  const [data, setData] = useState<User[]>([]);
  const [apiState, setApiState] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle');
  const [search, setSearch] = useState<string>('');

  const deleteItem = useCallback((id: string) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  }, []);

  const fetchData = useCallback(async () => {
    setApiState('loading');
    try {
      const API_URL = 'https://jsonplaceholder.typicode.com/users';
      const response = await fetch(API_URL);
      if (!response.ok) {
        setApiState('error');
        return;
      }
      const json = await response.json();
      setData(json);
      setApiState('success');
    } catch (e) {
      setApiState('error');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredResults = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();
    if (normalizedQuery === '') return data;
    return data.filter((user) => {
      return user.name.toLowerCase().includes(normalizedQuery);
    });
  }, [data, search]);

  const renderItem = useCallback(
    ({ item }: { item: User }) => {
      return <UserListItem {...item} onDelete={deleteItem} />;
    },
    [deleteItem],
  );

  const handleChangeText = useCallback((text: string) => setSearch(text), []);

  if (apiState === 'loading') {
    return <ActivityIndicator />;
  }

  if (apiState === 'error') {
    return <Text>Oops, there was an error while loading the data</Text>;
  }

  if (apiState !== 'success') return null;

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <SearchHeader search={search} onChangeText={handleChangeText} />
        }
        testID="searchNamesList"
        data={filteredResults}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        ListEmptyComponent={<Text testID="emptyResults">No users found</Text>}
      />
    </SafeAreaView>
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
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  safeArea: { backgroundColor: '#fff', flex: 1 },
  searchInput: { padding: 16 },
});

export default FilterList;
