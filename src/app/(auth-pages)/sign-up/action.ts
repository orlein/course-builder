'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { headers } from 'next/headers';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const passwordConfirm = formData.get('password-confirm')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      '이메일과 비밀번호를 입력해주세요.',
    );
  }

  if (password !== passwordConfirm) {
    return encodedRedirect(
      'error',
      '/sign-up',
      '비밀번호가 일치하지 않습니다.',
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  }

  return encodedRedirect(
    'success',
    '/sign-up',
    '계정 생성 이메일이 전송되었습니다. 이메일을 확인해주세요',
  );
};
