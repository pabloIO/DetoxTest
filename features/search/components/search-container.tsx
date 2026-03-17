import { User } from '@/app/(tabs)/search';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from './search-header';
import UserListItem from './user-list-item';

const keyExtractor = (item: User) => item.id;

const SearchContainer = () => {
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

  // DEBOUNCER
  function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer); // cleanup on every new value
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearch = useDebounce(search, 300);

  // IF THE SEARCH USES AN API CALL
  // useEffect(() => {
  //   if (!debouncedSearch.trim()) return;

  //   let cancelled = false; // prevent race conditions

  //   const fetchResults = async () => {
  //     try {
  //       const results = await searchAPI(debouncedSearch);
  //       if (!cancelled) setData(results);
  //     } catch (error) {
  //       if (!cancelled) setError(error);
  //     }
  //   };

  //   fetchResults();
  //   return () => { cancelled = true; };
  // }, [debouncedSearch]);

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
      <FlashList
        ListHeaderComponent={
          <SearchHeader search={search} onChangeText={handleChangeText} />
        }
        testID="searchNamesList"
        data={filteredResults}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<Text testID="emptyResults">No users found</Text>}

        // FOR FLATLIST OPTIMIZATION
        // initialNumToRender={10}
        // maxToRenderPerBatch={10}
        // windowSize={5}
        // removeClippedSubviews={true}
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

export default SearchContainer;
