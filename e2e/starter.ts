// describe('Example', () => {
// beforeEach(async () => {
//   await device.reloadReactNative();
// });

// the test will tap into the Explore tab and
// then tap the File-based routing button
// it('tap explore tab by label and check all collapse elements', async () => {
//   // fire event by label with iOS inspector
//   await element(by.label('Explore, tab, 2 of 2')).tap();
//   await element(by.label('Forward, File-based routing')).tap();
//   await element(by.label('Forward, File-based routing')).tap();
//   await element(by.label('Forward, Android, iOS, and web support')).tap();
//   await element(by.label('Forward, Android, iOS, and web support')).tap();
//   await element(by.label('Forward, Images')).tap();
//   await element(by.label('Forward, Images')).tap();
//   // fire event by accesibilityLabel
//   await element(by.label('light_dark_mode_components')).tap();
//   await element(by.label('light_dark_mode_components')).tap();
//   await element(by.label('Home, tab, 1 of 2')).tap();
// });

// it('Validate element using by.text()', async () => {
//   await expect(element(by.text('Step 1: Try it'))).toBeVisible();
//   await expect(element(by.text('Step 2: Explore'))).toBeVisible();
//   await expect(element(by.text('Step 3: Get a fresh start'))).toBeVisible();
//   // tap and open modal on explore
//   await element(by.text('Step 2: Explore')).tap();
//   await expect(element(by.text('This is a modal'))).toBeVisible();
//   await expect(element(by.text('Go to home screen'))).toBeVisible();
//   // close modal
//   await element(by.text('Go to home screen')).tap();
// });

// it('get attributes', async () => {
//   const attributes = await element(by.text('Step 1: Try it')).getAttributes();
//   console.log('attribs', attributes);
// });

// it('get indexAt ', async () => {
//   await element(by.label('listItem')).atIndex(0).tap();
//   await expect(element(by.text('alert text one'))).toBeVisible();
//   await element(by.text('OK')).tap();
// });

// it('get withAncestor ', async () => {
//   await element(by.label('listItem').withAncestor(by.id('parentView'))).tap();
//   await expect(element(by.text('List View'))).toBeVisible();
// });

// it('search names with no results', async () => {
//   await element(by.text('Search')).tap();
//   await element(by.id('searchNames')).replaceText('dsd');
//   await expect(element(by.id('emptyResults'))).toBeVisible();
// });

// it('search names with results', async () => {
//   await element(by.id('searchNames')).replaceText('Le');
//   await expect(element(by.text('Leanne Graham'))).toBeVisible();
// });

// it('multitap on counter', async () => {
//   await element(by.text('Counter')).tap();
//   await element(by.id('counterButton')).multiTap(10);
//   await expect(element(by.id('counterText'))).toHaveText('10');
// });
// });
