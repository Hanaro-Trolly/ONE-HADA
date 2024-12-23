import SettingsCard from '@/components/molecules/SwitchCard';
import type { Meta, StoryObj } from '@storybook/react';

// SwitchCard.tsx 내부 구현 이름이 SettingsCard인지 확인 후 수정하세요.

const meta: Meta<typeof SettingsCard> = {
  title: 'Molecules/SwitchCard',
  component: SettingsCard,
  tags: ['autodocs'],
  args: {
    mode: '알림 설정',
    checked: false,
  },
};
export default meta;

type Story = StoryObj<typeof SettingsCard>;

// 기본
export const Default: Story = {};

// 스위치가 켜져 있는 상태
export const Checked: Story = {
  args: {
    checked: true,
  },
};

// 스위치 토글 이벤트
export const ToggleSwitch: Story = {
  args: {
    checked: false,
    checkedChange: () => alert('스위치가 토글되었습니다.'),
  },
};
