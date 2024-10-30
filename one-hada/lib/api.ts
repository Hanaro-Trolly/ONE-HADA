import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchAllData = async <T>(resource: string): Promise<T[]> => {
  try {
    const response = await axios.get<T[]>(`${BASE_URL}/${resource}`);
    return response.data;
  } catch (err) {
    throw new Error('Error fetching data' + err);
  }
};

export const addData = async <T>(resource: string, newData: T): Promise<T> => {
  try {
    const response = await axios.post<T>(`${BASE_URL}/${resource}`, newData);
    return response.data;
  } catch (err) {
    throw new Error('Error adding data' + err);
  }
};

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
    throw new Error('Error updating data' + err);
  }
};

export const deleteData = async (
  resource: string,
  id: string
): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${resource}/${id}`);
  } catch (err) {
    throw new Error('Error deleting data' + err);
  }
};

export const getData = async <T>(
  resource: string,
  id: string
): Promise<T | null> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}/${resource}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('Error fetching data by ID' + err);
  }
};

export const getDataByUserId = async <T extends { user_id: string }>(
  resource: string,
  userId: string
): Promise<T[]> => {
  try {
    const data = await fetchAllData<T>(resource);
    const res = data.filter((item) => item.user_id === userId);
    return res;
  } catch (err) {
    throw new Error('Error fetching data by user ID: ' + err);
  }
};
