import AuthScreen from '../../page-objects/AuthScreen';

describe('Auth flow', () => {
  it('should login user', async () => {
    await AuthScreen.loginUser('test@example.com', 'password');
  });

  it('sessions should me persisted and show welcome screen', async () => {
    await device.reloadReactNative();
    await AuthScreen.expectWelcomeScreen();
    await AuthScreen.logOutUser();
  });
});
