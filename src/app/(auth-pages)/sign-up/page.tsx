import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { signUpAction } from './action';

export default async function SignUpPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <div className={cn('flex flex-col gap-6 w-full')}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>
              이메일 주소와 비밀번호를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호 확인</Label>
                  </div>
                  <Input
                    id="password"
                    name="confirm-password"
                    type="password"
                    required
                  />
                </div>
                <SubmitButton
                  className="w-full"
                  pendingText="Signing Up..."
                  formAction={signUpAction}
                >
                  회원가입
                </SubmitButton>
              </div>
              <div className="mt-4 text-center text-sm">
                계정이 있으신가요?{' '}
                <Link href="/sign-in" className="underline underline-offset-4">
                  로그인
                </Link>
              </div>
            </form>
            <FormMessage message={searchParams} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
