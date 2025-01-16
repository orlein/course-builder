import { Message } from '@/components/form-message';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { CoursesPageHeader } from './header';

export default async function CoursesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <CoursesPageHeader>
        <p className="mt-2">로그인이 필요합니다.</p>
        <Button variant={'outline'} asChild>
          <Link href="/sign-in">로그인</Link>
        </Button>
      </CoursesPageHeader>
    );
  }

  return (
    <CoursesPageHeader>
      <Link href="/courses/new">
        <Button variant={'outline'} asChild>
          코스 생성
        </Button>
      </Link>
    </CoursesPageHeader>
  );
}
