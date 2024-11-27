import axios from 'axios';
import {
  Account,
  Agent,
  Consultation,
  Shortcut,
  Transaction,
  User,
} from './datatypes';

const BASE_URL = 'http://localhost:3001'; //서버 URL

// 기본적으로 사용할 fetchAllData 함수
export const fetchAllData = async <T>(resource: string): Promise<T[]> => {
  try {
    const response = await axios.get<T[]>(`${BASE_URL}/${resource}`);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching data for ${resource}: ` + err);
  }
};

// 특정 ID로 데이터를 가져오는 함수
export const getData = async <T>(
  resource: string,
  id: string
): Promise<T | null> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}/${resource}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching data by ID for ${resource}: ` + err);
  }
};

// 데이터 추가
export const addData = async <T>(resource: string, newData: T): Promise<T> => {
  try {
    const response = await axios.post<T>(`${BASE_URL}/${resource}`, newData);
    return response.data;
  } catch (err) {
    throw new Error(`Error adding data for ${resource}: ` + err);
  }
};

// 데이터 수정 (부분 업데이트)
export const updateData = async <T>(
  resource: string,
  id: string,
  updatedData: Partial<T>
): Promise<T> => {
  try {
    const response = await axios.patch<T>(
      `${BASE_URL}/${resource}/${id}`,
      updatedData
    );
    return response.data;
  } catch (err) {
    throw new Error(`Error updating data for ${resource}: ` + err);
  }
};

// 데이터 삭제
export const deleteData = async (
  resource: string,
  id: string
): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${resource}/${id}`);
  } catch (err) {
    throw new Error(`Error deleting data for ${resource}: ` + err);
  }
};

// 특정 user_id로 데이터를 필터링하여 가져오는 함수
export const getDataByUserId = async <T extends { user_id: string }>(
  resource: string,
  userId: string
): Promise<T[]> => {
  try {
    const data = await fetchAllData<T>(resource);
    return data.filter((item) => item.user_id === userId);
  } catch (err) {
    throw new Error(`Error fetching data by user ID for ${resource}: ` + err);
  }
};

// ** User 관련 API **
export const getUser = (id: string) => getData<User>('user', id);
export const getAllUsers = () => fetchAllData<User>('user');
export const addUser = (newUser: User) => addData<User>('user', newUser);
export const updateUser = (id: string, updatedUser: Partial<User>) =>
  updateData<User>('user', id, updatedUser);
export const deleteUser = (id: string) => deleteData('user', id);

// ** History 관련 API **
export const getHistory = (id: string) => getData<History>('history', id);
export const getAllHistories = () => fetchAllData<History>('history');
export const addHistory = (newHistory: History) =>
  addData<History>('history', newHistory);
export const updateHistory = (id: string, updatedHistory: Partial<History>) =>
  updateData<History>('history', id, updatedHistory);
export const deleteHistory = (id: string) => deleteData('history', id);

// ** Shortcut 관련 API **
export const getShortcut = (id: string) => getData<Shortcut>('shortcut', id);
export const getAllShortcuts = () => fetchAllData<Shortcut>('shortcut');
export const addShortcut = (newShortcut: Shortcut) =>
  addData<Shortcut>('shortcut', newShortcut);
export const updateShortcut = (
  id: string,
  updatedShortcut: Partial<Shortcut>
) => updateData<Shortcut>('shortcut', id, updatedShortcut);
export const deleteShortcut = (id: string) => deleteData('shortcut', id);

// ** Agent 관련 API **
export const getAgent = (id: string) => getData<Agent>('agent', id);
export const getAllAgents = () => fetchAllData<Agent>('agent');
export const addAgent = (newAgent: Agent) => addData<Agent>('agent', newAgent);
export const updateAgent = (id: string, updatedAgent: Partial<Agent>) =>
  updateData<Agent>('agent', id, updatedAgent);
export const deleteAgent = (id: string) => deleteData('agent', id);

// ** Consultation 관련 API **
export const getConsultation = (id: string) =>
  getData<Consultation>('consultation', id);
export const getAllConsultations = () =>
  fetchAllData<Consultation>('consultation');
export const addConsultation = (newConsultation: Consultation) =>
  addData<Consultation>('consultation', newConsultation);
export const updateConsultation = (
  id: string,
  updatedConsultation: Partial<Consultation>
) => updateData<Consultation>('consultation', id, updatedConsultation);
export const deleteConsultation = (id: string) =>
  deleteData('consultation', id);

// ** Account 관련 API **
export const getAccount = (id: string) => getData<Account>('account', id);
export const getAllAccounts = () => fetchAllData<Account>('account');
export const addAccount = (newAccount: Account) =>
  addData<Account>('account', newAccount);
export const updateAccount = (id: string, updatedAccount: Partial<Account>) =>
  updateData<Account>('account', id, updatedAccount);
export const deleteAccount = (id: string) => deleteData('account', id);

// ** Transaction 관련 API **
export const getTransaction = (id: string) =>
  getData<Transaction>('transaction', id);
export const getAllTransactions = () =>
  fetchAllData<Transaction>('transaction');
export const addTransaction = (newTransaction: Transaction) =>
  addData<Transaction>('transaction', newTransaction);
export const updateTransaction = (
  id: string,
  updatedTransaction: Partial<Transaction>
) => updateData<Transaction>('transaction', id, updatedTransaction);
export const deleteTransaction = (id: string) => deleteData('transaction', id);
