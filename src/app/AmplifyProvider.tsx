'use client';

import { ReactNode, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';

export default function AmplifyProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Only configure Amplify on the client side
    if (typeof window !== 'undefined') {
      Amplify.configure({
        ...awsExports,
        // @ts-expect-error - SSR is supported but not in the types
        ssr: true
      });
    }
  }, []);

  return <>{children}</>;
}