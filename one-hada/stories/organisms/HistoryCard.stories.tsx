import HistoryCard from '@/components/activity/HistoryCard';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HistoryCard> = {
  title: 'Organisms/HistoryCard',
  component: HistoryCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
  args: {
    id: 'h1',
    name: '내역 이름',
    date: '2024-01-05',
  },
};
export default meta;

type Story = StoryObj<typeof HistoryCard>;

export const Default: Story = {};
