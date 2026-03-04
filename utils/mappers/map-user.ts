import { User } from '@/models/User';
import {
  type Session as SupabaseSession,
  type User as SupabaseUser,
} from '@supabase/supabase-js';

export const mapToUser = (
  user: SupabaseUser,
  session: SupabaseSession,
): User => ({
  id: user.id,
  email: user.email ?? '',
  name: user.user_metadata?.name ?? '',
  accessToken: session.access_token,
  refreshToken: session.refresh_token,
  expiresAt: session.expires_at ?? 0,
});
