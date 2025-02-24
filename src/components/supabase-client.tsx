'use client';

import { createClient } from '@/utils/supabase/client';
import React, { PropsWithChildren } from 'react';

const SupabaseContext = React.createContext<null | {
  isSignedIn: boolean;
}>(null);

export const useSupabase = () => {
  const supabase = React.useContext(SupabaseContext);

  if (!supabase) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }

  return supabase;
};

export function SupabaseProvider({ children }: PropsWithChildren) {
  const supabase = createClient();
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsSignedIn(true);
      }

      if (event === 'SIGNED_OUT') {
        setIsSignedIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ isSignedIn }}>
      {children}
    </SupabaseContext.Provider>
  );
}
