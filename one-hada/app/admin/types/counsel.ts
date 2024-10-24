export interface Counsel {
  id: number;
  agentid: string;
  userid: string;
  title: string;
  content: string;
  date: string;
}

export interface CounselContextType {
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  counselData: Counsel[];
  setCounselData: (data: Counsel[]) => void;
}
