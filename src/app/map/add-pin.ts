'use server';
import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { revalidatePath } from 'next/cache';

export const addPinAction = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const latitude = formData.get('latitude') as string;
  const longitude = formData.get('longitude') as string;

  const supabase = await createClient();

  const { error: getUserError, data } = await supabase.auth.getUser();

  if (getUserError) {
    return encodedRedirect('error', '/map', '로그인이 필요합니다.');
  }

  const { error } = await supabase.from('pins').insert({
    title,
    content,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    user_id: data.user.id,
  });

  if (error) {
    return encodedRedirect('error', '/map', error.message);
  }

  revalidatePath('/map');
};
