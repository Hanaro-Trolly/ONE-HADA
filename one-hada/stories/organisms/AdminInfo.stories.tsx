import AdminInfo from '@/components/admin/AdminInfo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AdminInfo> = {
  title: 'Organisms/AdminInfo',
  component: AdminInfo,
  tags: ['autodocs'],
  args: {
    birth: '1990-12-25',
    phone: '010-9876-5432',
  },
};
export default meta;

type Story = StoryObj<typeof AdminInfo>;

export const Default: Story = {};
