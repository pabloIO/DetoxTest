import { Girl } from '@/models/Girl';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from 'expo-router';
import { memo, useCallback } from 'react';
import { View } from 'tamagui';
import { useGirls } from '../hooks/use-girls';
import GirlEmpty from './girl-empty';
import GirlLoadingSkeleton from './girl-loading-skeleton';

function GirlContainer() {
  const { fetchGirls, isLoading, girls } = useGirls();

  useFocusEffect(
    useCallback(() => {
      fetchGirls();
    }, [fetchGirls]),
  );

  const keyExtractor = useCallback((item: Girl) => {
    return item.id;
  }, []);

  console.log('loading girls', isLoading);

  if (isLoading) return <GirlLoadingSkeleton />;

  return (
    <View backgroundColor="#fff" flex={1}>
      <FlashList
        keyExtractor={keyExtractor}
        data={girls}
        renderItem={() => null}
        ListEmptyComponent={<GirlEmpty />}
      />
    </View>
  );
}

export default memo(GirlContainer);
