import TabBar from '@/components/activity/TabBar';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TabBar> = {
  title: 'Organisms/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TabBar>;

export const Default: Story = {};
