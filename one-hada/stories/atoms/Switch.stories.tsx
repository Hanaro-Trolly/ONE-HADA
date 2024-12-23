import { Switch } from '@/components/ui/switch';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

// onCheckedChange를 통해 상태 변경 확인
export const WithOnCheckedChange: Story = {
  args: {
    onCheckedChange: (checked) => {
      alert(`스위치 상태가 ${checked ? 'ON' : 'OFF'}으로 변경되었습니다!`);
    },
  },
};

// Disabled 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};
