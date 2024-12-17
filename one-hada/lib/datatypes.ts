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
  historyElements: string;
  activityDate: Date;
};

type Shortcut = {
  shortcutId: string;
  userId: string;
  shortcutName: string;
  shortcutElements: string;
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
  id: string;
  sender_account_id: string;
  receiver_account_id: string;
  amount: number;
  sender_viewer: string;
  receiver_viewer: string;
  transaction_date: Date;
};

export type {
  User,
  Agent,
  History,
  Shortcut,
  Consultation,
  Account,
  Transaction,
};
