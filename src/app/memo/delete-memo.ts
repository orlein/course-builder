'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { revalidatePath } from 'next/cache';

export const deleteMemoAction = async (formData: FormData) => {
  const memoId = formData.get('memoId') as string;

  const supabase = await createClient();

  const { error } = await supabase.from('memo').delete().eq('id', memoId);

  if (error) {
    return encodedRedirect('error', '/memo', error.message);
  }

  revalidatePath('/memo');
};
