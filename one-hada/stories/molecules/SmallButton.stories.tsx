import SmallButton from '@/components/molecules/SmallButton';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';

// SmallButton은 내부에서 Button(Atom)을 이용해 작게 스타일링한 컴포넌트

const meta: Meta<typeof SmallButton> = {
  title: 'Molecules/SmallButton',
  component: SmallButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
  args: {
    children: 'Small Button',
    classNames: '', // SmallButton에 전달할 커스텀 클래스
  },
};
export default meta;

type Story = StoryObj<typeof SmallButton>;

// 기본 형태
export const Default: Story = {};

// 다양한 스타일 적용 예시
export const WithCustomStyle: Story = {
  args: {
    classNames: 'bg-[#E44B5B] hover:bg-[#B61C2B] text-white',
    children: 'Delete',
  },
};

// 클릭 이벤트 예시
export const Clickable: Story = {
  args: {
    onClick: () => alert('SmallButton이 클릭됨!'),
    children: 'Click Me',
  },
};
