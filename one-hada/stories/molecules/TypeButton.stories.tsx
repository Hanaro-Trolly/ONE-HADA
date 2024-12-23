import TypeButton from '@/components/molecules/TypeButton';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TypeButton> = {
  title: 'Molecules/TypeButton',
  component: TypeButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
  args: {
    button_type: '조회기간', // 예: '거래구분', '조회기간' 등
    children: '1개월',
  },
};
export default meta;

type Story = StoryObj<typeof TypeButton>;

export const Default: Story = {};

export const WithOnClick: Story = {
  args: {
    children: '3개월',
    onClick: () => alert('3개월 타입 버튼 클릭!'),
  },
};
