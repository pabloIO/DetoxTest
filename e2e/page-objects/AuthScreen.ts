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

  async tapLoginButton() {
    await element(by.id('login-button')).tap();
  }

  async loginUser(email: string, password: string) {
    await this.getEmailInput().replaceText(email);
    await this.getPasswordInput().replaceText(password);
    await this.tapLoginButton();
    await this.expectWelcomeScreen();
  }
}

export default new AuthScreen();
