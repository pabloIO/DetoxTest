import SearchScreen from '../page-objects/SearchScreen';

describe('Search delete flow', () => {
  beforeEach(async () => {
    await SearchScreen.goToSearchScreen();
  });

  it('should delete user item', async () => {
    await SearchScreen.deleteUser('Leanne Graham');
    await SearchScreen.expectUserDeleted('Leanne Graham');
  });
});
