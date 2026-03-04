import { expect } from 'detox';
class AuthScreen {
  getEmailInput = () => element(by.id('email-input'));
  getPasswordInput = () => element(by.id('password-input'));

  async goToLoginScreen() {
    await element(by.text('Sign in')).tap();
  }

  async logOutUser() {
    await element(by.id('logout-button')).tap();
    await expect(element(by.id('login-welcome'))).toBeVisible();
  }

  async goToRegisterScreen() {
    await element(by.text('Register')).tap();
  }

  async expectWelcomeScreen() {
    await waitFor(element(by.id('welcome')))
      .toBeVisible()
      .withTimeout(3000);
  }

  async expectInvalidCredentials() {
    await waitFor(element(by.text('Invalid credentials')))
      .toBeVisible()
      .withTimeout(3000);
  }

  async expectInvalidEmail() {
    await waitFor(
      element(
        by.text(
          'AuthApiError: Unable to validate email address: invalid format',
        ),
      ),
    )
      .toBeVisible()
      .withTimeout(3000);
  }

  async expectInvalidPassword() {
    await waitFor(
      element(
        by.text(
          'AuthWeakPasswordError: Password should be at least 6 characters.',
        ),
      ),
    )
      .toBeVisible()
      .withTimeout(3000);
  }

  async tapLoginButton() {
    await element(by.id('login-button')).tap();
  }

  async tapRegisterButton() {
    await element(by.id('register-button')).tap();
  }

  async tapShowPasswordButton() {
    await element(by.id('show-password-button')).tap();
  }

  async loginUser(email: string, password: string) {
    await this.getEmailInput().replaceText(email);
    await this.getPasswordInput().replaceText(password);
    await this.tapLoginButton();
    await this.expectWelcomeScreen();
  }

  async invalidLoginUser(email: string, password: string) {
    await this.getEmailInput().replaceText(email);
    await this.getPasswordInput().replaceText(password);
    await this.tapLoginButton();
    await this.expectInvalidCredentials();
  }

  async showPassword(email: string, password: string) {
    await this.getEmailInput().replaceText(email);
    await this.getPasswordInput().replaceText(password);
    await this.tapShowPasswordButton();
    await expect(this.getPasswordInput()).toHaveText(password);
  }

  async invalidEmailRegisterUser() {
    await this.goToRegisterScreen();
    await this.getEmailInput().replaceText('test');
    await this.getPasswordInput().replaceText('123456');
    await this.tapRegisterButton();
    await this.expectInvalidEmail();
  }

  async invalidPasswordRegisterUser() {
    await this.goToRegisterScreen();
    await this.getEmailInput().replaceText('test@gmail.com');
    await this.getPasswordInput().replaceText('1234');
    await this.tapRegisterButton();
    await this.expectInvalidPassword();
  }

  async registerUser(email: string, password: string) {
    await this.goToRegisterScreen();
    await this.getEmailInput().replaceText(email);
    await this.getPasswordInput().replaceText(password);
    await this.tapRegisterButton();
    await this.expectWelcomeScreen();
    await this.logOutUser();
  }
}

export default new AuthScreen();
