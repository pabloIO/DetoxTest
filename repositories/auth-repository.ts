import { supabase } from '@/lib/supabase';
import { User } from '@/models/User';
import { mapToUser } from '@/utils/mappers/map-user';

type AuthCredentials = {
  email: string;
  password: string;
};

type AuthRepository = {
  login: (credentials: AuthCredentials) => Promise<User>;
  register: (credentials: AuthCredentials) => Promise<User>;
  logout: () => Promise<void>;
  getSession: () => Promise<User | null>;
};

export const authRepository: AuthRepository = {
  login: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return mapToUser(data.user, data.session);
  },

  register: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    if (!data.user || !data.session) throw new Error('Failed to create user');
    return mapToUser(data.user, data.session);
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (!data.session) return null;
    return mapToUser(data.session.user, data.session);
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
