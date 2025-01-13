import { Message } from '@/components/form-message';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { signOutAction } from '../(auth-pages)/sign-out/action';

export default async function ProfilePage(props: {
  searchParams: Promise<Message>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const searchParams = await props.searchParams;

  if (!user) {
    return redirect('/login');
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <p className="mt-2">Welcome, {user.email}.</p>
        <Image
          src="/profile-pic.jpg"
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-full mt-4"
        />
        <form action={signOutAction}>
          <Button type="submit" variant={'outline'}>
            Sign out
          </Button>
        </form>
      </div>
    </>
  );
}
