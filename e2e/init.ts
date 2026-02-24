import { device } from 'detox';

beforeAll(async () => {
  // This is required to make sure the app is launched before any test runs.
  // If you have some global setup that needs to be done before the app is launched, you can do it here.
  await device.launchApp({ newInstance: true });
});

afterAll(async () => {
  // This is required to make sure the app is launched before any test runs.
  // If you have some global setup that needs to be done before the app is launched, you can do it here.
  await device.terminateApp();
});
