import ShortCutCard from '@/components/activity/ShortCutCard';
import { WebSocketProvider } from '@/context/user/UserWebSocketContext';
import type { Meta, StoryObj } from '@storybook/react';
import { HistoryElementType } from '@/lib/datatypes';

const meta: Meta<typeof ShortCutCard> = {
  title: 'Organisms/ShortCutCard',
  component: ShortCutCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WebSocketProvider>
        <Story />
      </WebSocketProvider>
    ),
  ],
  args: {
    id: 'shortcut1',
    name: '바로가기 예시',
    isEdit: false,
    isFavorite: false,
    shortcutElements: {} as HistoryElementType,
  },
};
export default meta;

type Story = StoryObj<typeof ShortCutCard>;

export const Default: Story = {
  args: {
    onButtonClick: () => alert('바로가기 클릭됨!'),
    favoriteToggle: (id) => alert(`즐겨찾기 토글: ${id}`),
  },
};

export const Favorite: Story = {
  args: {
    isFavorite: true,
  },
};

export const EditMode: Story = {
  args: {
    isEdit: true,
  },
};
