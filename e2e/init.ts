import { device } from 'detox';
import { supabaseAdmin } from './helpers/supabase-admin';

beforeAll(async () => {
  // This is required to make sure the app is launched before any test runs.
  // If you have some global setup that needs to be done before the app is launched, you can do it here.
  await device.launchApp({ newInstance: true });
});

afterAll(async () => {
  let createdUserId = '';
  const { data } = await supabaseAdmin.auth.admin.listUsers();
  const user = data.users.find((u) => u.email === 'test@gmail.com');
  createdUserId = user?.id ?? '';
  if (createdUserId) {
    await supabaseAdmin.auth.admin.deleteUser(createdUserId);
  }
  // This is required to make sure the app is launched before any test runs.
  // If you have some global setup that needs to be done before the app is launched, you can do it here.
  await device.terminateApp();
});
