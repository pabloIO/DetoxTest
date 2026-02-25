import { memo } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type SearchHeaderProps = {
  search: string;
  onChangeText: (text: string) => void;
};

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

const styles = StyleSheet.create({
  searchInput: { padding: 16 },
});

export default SearchHeader;
