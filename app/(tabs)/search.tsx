import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from 'react-native';
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

const FilterList = () => {
  const [data, setData] = useState<User[]>([]);
  const [apiState, setApiState] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle');
  const [search, setSearch] = useState<string>('');

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
    return <UserListItem {...item} />;
  }, []);

  if (apiState === 'loading') {
    return <ActivityIndicator />;
  }

  if (apiState === 'error') {
    return <Text>Oops, there was an error while loading the data</Text>;
  }

  if (apiState !== 'success') return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
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
      </View>
    </SafeAreaView>
  );
};

export default FilterList;
