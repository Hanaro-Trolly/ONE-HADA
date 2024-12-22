import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import '../app/globals.css';

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    loaders: [mswLoader],
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <SessionWrapper>
        <div className='min-h-screen bg-gray-50 p-4'>
          <Story />
        </div>
      </SessionWrapper>
    ),
  ],
};

export default preview;
