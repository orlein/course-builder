'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { revalidatePath } from 'next/cache';

type FormState = {
  success: boolean;
};

export const addMemoAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const supabase = await createClient();

  const { error: getUserError, data } = await supabase.auth.getUser();

  if (getUserError) {
    return encodedRedirect('error', '/memo', '로그인이 필요합니다.');
  }

  if (title.length === 0 || content.length === 0) {
    return encodedRedirect(
      'error',
      '/memo',
      '제목과 내용을 모두 입력해주세요.',
    );
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

  return {
    success: true,
  };
};
