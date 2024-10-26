import axios from 'axios';
import { useEffect, useState } from 'react';

type UseApiResponse<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
  addData: (newData: T) => Promise<void>;
  updateData: (id: string, updatedData: Partial<T>) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  getData: (id: string) => Promise<T | null>;
};

const useApi = <T extends { id: string }>(
  resource: string
): UseApiResponse<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T[]>(
          `http://localhost:3001/${resource}`
        );
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resource]);

  const addData = async (newData: T) => {
    try {
      const response = await axios.post<T>(
        `http://localhost:3001/${resource}`,
        newData
      );
      setData((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateData = async (id: string, updatedData: Partial<T>) => {
    try {
      const response = await axios.patch<T>(
        `http://localhost:3001/${resource}/${id}`,
        updatedData
      );
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...response.data } : item
        )
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteData = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/${resource}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  const getData = async (id: string): Promise<T | null> => {
    try {
      const response = await axios.get<T>(
        `http://localhost:3001/${resource}/${id}`
      );
      return response.data;
    } catch (err) {
      setError(err as Error);
      return null;
    }
  };

  return { data, loading, error, addData, updateData, deleteData, getData };
};

export default useApi;
