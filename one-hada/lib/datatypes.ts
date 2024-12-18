type User = {
  userId: string;
  userName: string;
  userEmail: string | undefined;
  userGender: string;
  userPhone: string;
  userAddress: string;
  userBirth: string;
  userRegister: Date;
  userGoogle: string | null;
  userKakao: string | null;
  userNaver: string | null;
  simplePassword: string[] | null;
};

type Agent = {
  id: string;
  agent_name: string;
  agent_email: string;
  agent_pw: string;
};

type History = {
  historyId: string;
  userId: string;
  historyName: string;
  historyElements: HistoryElementType[];
  activityDate: Date;
};

type Shortcut = {
  shortcutId: string;
  userId: string;
  shortcutName: string;
  shortcutElements: HistoryElementType[];
  isFavorite: boolean;
};

type Consultation = {
  consultationId: string;
  agentId: string;
  userId: string;
  consultationTitle: string;
  consultationContent: string;
  consultationDate: Date;
};

type Account = {
  accountId: string;
  userId: string;
  accountNumber: number;
  balance: number;
  accountType: string;
  bank: string;
  accountName: string;
};

type Transaction = {
  transactionId: string;
  transactionType: string;
  amount: number;
  view: string;
  receiverViewer: string;
  transactionDateTime: string;
  balance: number;
};

type HistoryElementType = {
  type: string;
  myAccount?: string;
  receiverAccount?: string;
  amount?: string;
  period?: string;
  transferType?: string;
  searchWord?: string;
};

type UserInput = {
  name: string | undefined;
  email: string | null | undefined;
  gender: 'M' | 'F' | undefined;
  birth: string | undefined;
  phone: string;
  address: string;
  google: string | null | undefined;
  kakao: string | null | undefined;
  naver: string | null | undefined;
  simplePassword: string | undefined;
};

export type {
  User,
  Agent,
  History,
  Shortcut,
  Consultation,
  Account,
  Transaction,
  HistoryElementType,
  UserInput,
};
