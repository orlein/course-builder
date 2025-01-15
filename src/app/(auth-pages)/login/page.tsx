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
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { loginAction } from './action';

export default async function LoginPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className={cn('flex flex-col gap-6 w-full')}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    tabIndex={-1}
                  >
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <SubmitButton className="w-full" formAction={loginAction}>
                로그인
              </SubmitButton>
            </div>
            <div className="mt-4 text-center text-sm">
              계정이 없으신가요?
              <Link href="/sign-up" className="underline underline-offset-4">
                회원가입
              </Link>
            </div>
          </form>
          <FormMessage message={searchParams} />
        </CardContent>
      </Card>
    </div>
  );
}
