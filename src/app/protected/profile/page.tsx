import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
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
        <Link
          href="/protected"
          className="text-blue-500 hover:underline mt-4 block"
        >
          Return to Protected
        </Link>
      </div>
    </>
  );
}
