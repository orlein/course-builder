import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordAction } from './action';

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">비밀번호 재설정</h1>
      <p className="text-sm text-foreground/60">비밀번호를 재설정해주세요.</p>
      <Label htmlFor="password">새 비밀번호</Label>
      <Input
        type="password"
        name="password"
        placeholder="새 비밀번호"
        required
      />
      <Label htmlFor="confirmPassword">비밀번호 확인</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        비밀번호 재설정
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
