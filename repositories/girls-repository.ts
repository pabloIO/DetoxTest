// repositories/girls-repository.ts
import { supabase } from '@/lib/supabase';
import { Girl } from '@/models/Girl';

type CreateGirlInput = Omit<Girl, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
type UpdateGirlInput = Partial<CreateGirlInput>;

type GirlsRepository = {
  getAll: () => Promise<Girl[]>;
  getById: (id: string) => Promise<Girl>;
  create: (input: CreateGirlInput) => Promise<Girl>;
  update: (id: string, input: UpdateGirlInput) => Promise<Girl>;
  delete: (id: string) => Promise<void>;
};

const mapToGirl = (data: any): Girl => ({
  id: data.id,
  userId: data.user_id,
  name: data.name,
  age: data.age,
  occupation: data.occupation,
  photoUrl: data.photo_url,
  notes: data.notes,
  isActive: data.is_active,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export const girlsRepository: GirlsRepository = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('girls')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data.map(mapToGirl);
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('girls')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return mapToGirl(data);
  },

  create: async (input) => {
    const { data, error } = await supabase
      .from('girls')
      .insert({
        name: input.name,
        age: input.age,
        occupation: input.occupation,
        photo_url: input.photoUrl,
        notes: input.notes,
        is_active: input.isActive,
      })
      .select()
      .single();
    if (error) throw error;
    return mapToGirl(data);
  },

  update: async (id, input) => {
    const { data, error } = await supabase
      .from('girls')
      .update({
        name: input.name,
        age: input.age,
        occupation: input.occupation,
        photo_url: input.photoUrl,
        notes: input.notes,
        is_active: input.isActive,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return mapToGirl(data);
  },

  delete: async (id) => {
    const { error } = await supabase.from('girls').delete().eq('id', id);
    if (error) throw error;
  },
};
