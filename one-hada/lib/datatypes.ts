type User = {
  id: string;
  user_name: string;
  user_email: string | undefined;
  user_gender: string;
  user_phone: string;
  user_address: string;
  user_birth: string;
  user_register: Date;
  user_google: string | null;
  user_kakao: string | null;
  user_naver: string | null;
};

type Agent = {
  id: string;
  agent_name: string;
  agent_email: string;
  agent_pw: string;
};

type History = {
  id: string;
  user_id: string;
  history_name: string;
  history_elements: string;
  activity_date: Date;
};

type Shortcut = {
  id: string;
  user_id: string;
  shortcut_name: string;
  shortcut_elements: string;
  is_Favorite: boolean;
};

type Consultation = {
  id: string;
  agent_id: string;
  user_id: string;
  consultation_title: string;
  consultation_content: string;
  consultation_date: Date;
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
  viewer: string;
  receiverViewer: string;
  transactionDate: string;
  balance: number;
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
  UserInput,
};
