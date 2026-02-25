import SearchContainer from '@/features/search/components/search-container';

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

const SearchView = () => {
  return <SearchContainer />;
};

export default SearchView;
