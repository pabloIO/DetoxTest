import { expect } from 'detox';

class SearchScreen {
  getUserItem = (name: string) => element(by.text(name));

  async goToSearchScreen() {
    await element(by.text('Search')).tap();
  }

  async expectUserVisible(name: string) {
    await expect(this.getUserItem(name)).toBeVisible();
  }

  async swipeUserItem(name: string, direction: 'left' | 'right') {
    await this.getUserItem(name).swipe(direction);
  }

  async tapDeleteButton(name: string) {
    await element(by.id(`delete-user-${name}`)).tap();
  }

  async deleteUser(name: string) {
    await this.swipeUserItem(name, 'left');
    await this.tapDeleteButton(name);
  }

  async expectUserDeleted(name: string) {
    await expect(this.getUserItem(name)).not.toBeVisible();
  }
}

export default new SearchScreen();
