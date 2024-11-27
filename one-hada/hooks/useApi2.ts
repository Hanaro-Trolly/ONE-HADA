import { useState } from 'react';
import {
  fetchAllData,
  getData,
  addData,
  updateData,
  deleteData,
} from '@/lib/api';

type ApiState<T> = {
  data: T | T[] | null;
  isLoading: boolean;
  error: string | null;
};

const useApi = <T>(resource: string) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const setLoading = (loading: boolean) =>
    setState((prev) => ({ ...prev, isLoading: loading }));
  const setError = (error: string | null) =>
    setState((prev) => ({ ...prev, error }));
  const setData = (data: T | T[] | null) =>
    setState((prev) => ({ ...prev, data }));

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await fetchAllData<T>(resource);
      setData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchById = async (id: string) => {
    setLoading(true);
    try {
      const data = await getData<T>(resource, id);
      setData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const add = async (newData: T) => {
    setLoading(true);
    try {
      const data = await addData<T>(resource, newData); // addData는 단일 객체를 반환함
      setData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, updatedData: Partial<T>) => {
    setLoading(true);
    try {
      const data = await updateData<T>(resource, id, updatedData);
      setData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteById = async (id: string) => {
    setLoading(true);
    try {
      await deleteData(resource, id);
      setData(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    fetchAll,
    fetchById,
    add,
    update,
    deleteById,
  };
};

export default useApi;
