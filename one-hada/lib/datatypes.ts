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
  simple_password: string[] | null;
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
  history_type: 'inquiry' | 'transaction' | 'acc';
  history_params: string;
  activity_date: Date;
  is_Shortcut: boolean;
};

// type History = {
//   id: string;
//   user_id: string;
//   history_name: string;
//   history_url : string;
//   activity_date: Date;
// };

type Shortcut = {
  id: string;
  user_id: string;
  shortcut_name: string;
  shortcutUrl: string;
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
  id: string;
  user_id: string;
  account_number: number;
  balance: number;
  account_type: string;
  bank: string;
  account_name: string;
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
