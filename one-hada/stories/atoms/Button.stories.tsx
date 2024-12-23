import { Button } from '@/components/ui/button';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    // Button 컴포넌트의 기본 props 설정
    children: '기본 버튼',
    variant: 'default',
    size: 'default',
  },
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Button>;

// 기본 형태
export const Default: Story = {};

// 다른 Variant 예시
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '위험 버튼',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '외곽선 버튼',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '고스트 버튼',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: '링크 버튼',
  },
};

// 사이즈 예시
export const Small: Story = {
  args: {
    size: 'sm',
    children: '작은 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: '큰 버튼',
  },
};

// 클릭 이벤트 확인
export const ClickEvent: Story = {
  args: {
    children: '클릭해보세요',
    onClick: () => alert('버튼이 클릭되었습니다.'),
  },
};
