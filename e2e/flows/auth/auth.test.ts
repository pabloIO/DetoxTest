import AuthScreen from '../../page-objects/AuthScreen';

describe('Auth flow', () => {
  it('should show the password when eye button is tapped', async () => {
    await AuthScreen.showPassword('pablomontesjordan@gmail.com', '12345678');
  });

  it('should succesfully login user', async () => {
    await AuthScreen.loginUser('pablomontesjordan@gmail.com', '12345678');
  });

  it('sessions should me persisted and show welcome screen', async () => {
    await device.reloadReactNative();
    await AuthScreen.expectWelcomeScreen();
    await AuthScreen.logOutUser();
  });

  it('should fail to login user', async () => {
    await AuthScreen.invalidLoginUser('pablomontesjordan@gmail.com', '11238');
  });

  it('should fail to register user with invalid email', async () => {
    await device.reloadReactNative();
    await AuthScreen.invalidEmailRegisterUser();
  });

  it('should fail to register user with invalid password', async () => {
    await device.reloadReactNative();

    await AuthScreen.invalidPasswordRegisterUser();
  });

  it('should register new user successfully', async () => {
    await device.reloadReactNative();

    await AuthScreen.registerUser('test@gmail.com', '123456');
  });
});
