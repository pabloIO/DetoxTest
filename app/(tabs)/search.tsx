import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
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
  deleteItem: (id: string) => void;
};

import type { SharedValue } from 'react-native-reanimated';

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
      style={[
        {
          width: 100,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor: 'gray',
          borderWidth: 1,
          borderTopColor: 'gray',
        },
        animatedStyle,
      ]}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
    </AnimatedPressable>
  );
};

const UserListItem = memo(({ name, username, id, deleteItem }: User) => {
  return (
    <Animated.View
      layout={LinearTransition.springify()}
      exiting={SlideOutRight.springify()}
    >
      <Swipeable
        renderRightActions={(progress, translation) => (
          <RightSwipeActions
            onDelete={() => deleteItem(id)}
            progress={progress}
            translation={translation}
            id={name}
          />
        )}
      >
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            backgroundColor: 'white',
          }}
        >
          <Text>{name}</Text>
          <Text>{username}</Text>
        </View>
      </Swipeable>
    </Animated.View>
  );
});

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

  const renderItem = useCallback(({ item }: { item: User }) => {
    return <UserListItem {...item} deleteItem={deleteItem} />;
  }, []);

  if (apiState === 'loading') {
    return <ActivityIndicator />;
  }

  if (apiState === 'error') {
    return <Text>Oops, there was an error while loading the data</Text>;
  }

  if (apiState !== 'success') return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TextInput
        testID="searchNames"
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search users name"
        style={{ padding: 16 }}
      />
      <FlatList
        testID="searchNamesList"
        data={filteredResults}
        keyExtractor={(item: User) => item.id}
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

export default FilterList;
