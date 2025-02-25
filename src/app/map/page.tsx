import { FormMessage, Message } from '@/components/form-message';
import { NaverMapWrapper } from './naver-map-wrapper';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function MapPage(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data, error } = await supabase.from('pins').select('*');
  if (error) {
    redirect('/');
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">지도에서 관광지를 찾아보세요</h2>
      <NaverMapWrapper pins={data} />
      <FormMessage message={searchParams} />
    </div>
  );
}
