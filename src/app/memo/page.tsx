import { createClient } from '@/utils/supabase/server';
import { AddMemoForm } from './add-memo-form';
import { deleteMemoAction } from './delete-memo';
import { SubmitButton } from '@/components/submit-button';
import { FormMessage, Message } from '@/components/form-message';

export default async function MemoPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <h1>Memo Page</h1>
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  const memoList = await supabase.from('memo').select('*');

  if (memoList.error) {
    return (
      <div>
        <h1>Memo Page</h1>
        <p>메모 목록을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Memo Page</h1>
      <AddMemoForm />
      <FormMessage message={searchParams} />

      <div className="space-y-4">
        {memoList.data?.map((memo) => (
          <form key={memo.id} action={deleteMemoAction}>
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              제목: {memo.title}
            </h2>
            <p>{memo.content}</p>
            <input type="hidden" name="memoId" value={memo.id} />
            <SubmitButton>삭제하기</SubmitButton>
            <hr />
          </form>
        ))}
      </div>
    </div>
  );
}
