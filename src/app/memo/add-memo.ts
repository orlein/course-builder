'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { revalidatePath } from 'next/cache';

export const addMemoAction = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const supabase = await createClient();

  const { error: getUserError, data } = await supabase.auth.getUser();

  if (getUserError) {
    return encodedRedirect('error', '/memo', '로그인이 필요합니다.');
  }

  const { error } = await supabase.from('memo').insert({
    title,
    content,
    user_id: data.user.id,
  });

  if (error) {
    return encodedRedirect('error', '/memo', error.message);
  }

  revalidatePath('/memo');
};
