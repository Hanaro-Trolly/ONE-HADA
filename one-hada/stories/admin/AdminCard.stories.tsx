import AdminCard from '@/components/admin/AdminCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AdminCard> = {
  component: AdminCard,
  title: 'Admin/AdminCard',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    date: { control: 'text' },
    content: { control: 'text' },
    birth: { control: 'text' },
    phone: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof AdminCard>;

export const Default: Story = {
  args: {
    title: '첫 번째 상담',
    date: '2024-12-22T13:00:00',
    content: '상담 내용 첫 번째 줄\n상담 내용 두 번째 줄\n상담 내용 세 번째 줄',
    birth: '1990-01-01',
    phone: '010-1234-5678',
  },
};

export const LongContent: Story = {
  args: {
    title: '긴 내용의 상담',
    date: '2024-12-22T15:30:00',
    content:
      '1. 고객이 처음 방문했을 때의 상담 내용\n2. 구체적인 요구사항 파악\n3. 제품 추천 및 설명\n4. 향후 관리 계획 논의\n5. 다음 상담 일정 조율',
    birth: '1985-12-25',
    phone: '010-9876-5432',
  },
};

export const NoDate: Story = {
  args: {
    title: '날짜 없는 상담',
    date: '',
    content: '상담 내용입니다.\n추가 내용입니다.',
    birth: '1988-03-15',
    phone: '010-1111-2222',
  },
};

export const WithCustomStyle: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <div className='p-4 max-w-2xl mx-auto bg-gray-100'>
        <Story />
      </div>
    ),
  ],
};
