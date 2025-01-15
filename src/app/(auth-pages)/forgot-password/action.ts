'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect(
      'error',
      '/forgot-password',
      '이메일을 입력해주세요.',
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      '비밀번호를 재설정할 수 없습니다.',
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    '비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.',
  );
};
