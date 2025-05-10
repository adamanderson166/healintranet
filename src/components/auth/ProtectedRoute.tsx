'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuthState } from '@/utils/auth';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: {
    username: string;
    signInDetails?: any; // You can replace this with CognitoAuthSignInDetails if you import the type
    userId: string;
  } | null;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
  });
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function verifyAuth() {
      try {
        const state = await checkAuthState();
        console.log('[ProtectedRoute] Auth state:', state);

        if (!state.isAuthenticated) {
          if (isMounted) router.push('/login');
          return;
        }

        if (adminOnly && !state.isAdmin) {
          if (isMounted) router.push('/unauthorized');
          return;
        }

        if (isMounted) {
          setAuthState(state);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('[ProtectedRoute] Auth verification error:', error);
        if (isMounted) router.push('/login');
      }
    }

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [adminOnly, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
