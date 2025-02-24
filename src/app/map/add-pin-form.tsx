'use client';

import { useNaverMap } from '@/components/naver-map';
import { SubmitButton } from '@/components/submit-button';
import { useSupabase } from '@/components/supabase-client';
import { addPinAction } from './add-pin';

export function AddPinButton() {
  const { clickedCoord } = useNaverMap();
  const { isSignedIn } = useSupabase();

  if (!isSignedIn) {
    return <p>핀추가 기능을 위해서 로그인이 필요합니다.</p>;
  }

  if (!clickedCoord) {
    return null;
  }

  return (
    <form action={addPinAction}>
      <input
        type="hidden"
        name="latitude"
        defaultValue={String(clickedCoord?.y)}
      />
      <input
        type="hidden"
        name="longitude"
        defaultValue={String(clickedCoord?.x)}
      />
      <SubmitButton>핀 추가</SubmitButton>
    </form>
  );
}
