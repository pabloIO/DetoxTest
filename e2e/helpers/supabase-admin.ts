// e2e/helpers/supabase-admin.ts
import { createClient } from '@supabase/supabase-js';

// service role key has admin privileges — never expose this in the app
// only use in tests/backend
export const supabaseAdmin = createClient(
  'https://hyllxzmcxdfxjvmtmdvl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bGx4em1jeGRmeGp2bXRtZHZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjEzODUwMiwiZXhwIjoyMDg3NzE0NTAyfQ.3X-RxSWrSqdpmRoA9g1Ltk3JmeMJ5uHT8PVXHXRzBMs',
);
