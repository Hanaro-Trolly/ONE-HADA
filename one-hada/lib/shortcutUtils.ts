import { HistoryElementType } from './datatypes';

export const handleShortcutClick = async (
  shortcutElements: HistoryElementType,
  fetchData: (
    url: string,
    options: { method: string; token?: string; body: HistoryElementType }
  ) => Promise<unknown>,
  accessToken?: string
) => {
  try {
    await fetchData(`/api/redis`, {
      method: 'POST',
      token: accessToken,
      body: shortcutElements,
    });
    return true;
  } catch (error) {
    console.error('Error handling shortcut click:', error);
    return false;
  }
};
