export type Counsel = {
  id: string;
  agent_id: string;
  user_id: string;
  user_name: string;
  user_birth: string;
  user_phone: string;
  consultation_title: string;
  consultation_content: string;
  consultation_date: string;
};

export type CounselContextType = {
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  counselData: Counsel[];
  setCounselData: (data: Counsel[]) => void;
  fetchCounselData: () => Promise<void>;
};
