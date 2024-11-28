import { HistoryElementType } from '@/app/(site)/activity/@tabs/history/@historymodal/[historyId]/page';

const JSONtoUrl = (elements: HistoryElementType) => {
  if (elements.type === 'transfer') {
    if (elements.myAccount && elements.receiverAccount && elements.amount) {
      return `/transfer/validation`;
    }
    if (elements.myAccount && elements.receiverAccount) {
      return `/transfer/amount`;
    }
    if (elements.myAccount) {
      return `/transfer/recipient`;
    }
  } else if (elements.type === 'inquiry' && elements.myAccount) {
    return `/check/${elements.myAccount}/detail`;
  }
  return `/${elements.type}`;
};

export default JSONtoUrl;
