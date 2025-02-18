import { createClient } from '@/utils/supabase/server';

export default async function MemoPage() {
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
      <p>Memo page content</p>
      <pre>
        <code>{JSON.stringify(memoList, null, 2)}</code>
      </pre>
      {memoList.data?.map((memo) => (
        <div key={memo.id}>
          <h2>{memo.title}</h2>
          <p>{memo.content}</p>
        </div>
      ))}
    </div>
  );
}
