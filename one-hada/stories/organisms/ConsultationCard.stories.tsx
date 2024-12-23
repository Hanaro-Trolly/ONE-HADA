import ConsultationCard from '@/components/activity/ConsultationCard';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConsultationCard> = {
  title: 'Organisms/ConsultationCard',
  component: ConsultationCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
  args: {
    title: '카드 제목 예시',
    date: '2024-01-01',
    content: `첫째줄 상담 내용\n둘째줄 상담 내용\n셋째줄 상담 내용`,
  },
};
export default meta;

type Story = StoryObj<typeof ConsultationCard>;

export const Default: Story = {};

// 상세 펼쳐진 상태
export const DetailOpen: Story = {
  render: (args) => {
    // isDetail을 기본 true로 설정하기 위해 임시로 모킹
    return <ConsultationCard {...args} />;
  },
};
