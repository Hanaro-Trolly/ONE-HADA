import CheckBoxCard from '@/components/activity/CheckBoxCard';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckBoxCard> = {
  title: 'Organisms/CheckBoxCard',
  component: CheckBoxCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
  args: {
    id: 'myAccount',
    title: 'myAccount', // Map으로 '내계좌'가 표시됨
    description: '내 계좌 정보를 표시합니다.',
    isChecked: false,
  },
};
export default meta;

type Story = StoryObj<typeof CheckBoxCard>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    isChecked: true,
  },
};

export const WithToggleHandler: Story = {
  args: {
    onChange: (title, isChecked) => {
      alert(`CheckBoxCard: ${title} → ${isChecked ? '체크됨' : '체크 해제됨'}`);
    },
  },
};
