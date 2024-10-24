// app/component/ui/AuthButton.tsx
'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

// app/component/ui/AuthButton.tsx

// app/component/ui/AuthButton.tsx

// app/component/ui/AuthButton.tsx

// app/component/ui/AuthButton.tsx

// app/component/ui/AuthButton.tsx

// app/component/ui/AuthButton.tsx

type IProps = {
  providers: Record<string, ClientSafeProvider>;
};

export default function AuthButton({ providers }: IProps) {
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className='m-4 bg-slate-200'>
          <button
            onClick={() =>
              signIn(provider.id, { callbackUrl: '/api/auth/checkLogin' })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
