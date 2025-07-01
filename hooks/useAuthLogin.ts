import Http from '@/http';
import { useCallback } from 'react';
import { LogInFormTypes } from '@/types/auth';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

type Props = {
  onError?: (error: AxiosError<{ message?: string }>) => void;
  onSuccess?: (data: AxiosResponse<{ message?: string }>) => void;
};

const useAuthLogin = ({ onError, onSuccess }: Props) => {
  const execute = useCallback(
    async (data: LogInFormTypes): Promise<AxiosResponse<{ message?: string }>> => {
      return await Http.request<LogInFormTypes, { message?: string }>('POST', '/auth/login', data);
    },
    [],
  );

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: execute,
    mutationKey: ['login-form'],
    onSuccess,
    onError,
  });

  return {
    data,
    error,
    mutate,
    isPending,
  };
};

export default useAuthLogin;
