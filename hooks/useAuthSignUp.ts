import Http from '@/http';
import { useCallback } from 'react';
import { SignUpFormTypes } from '@/types/auth';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

type Props = {
  onError?: (error: AxiosError<{ message?: string }>) => void;
  onSuccess?: (data: AxiosResponse<{ message?: string }>) => void;
};

const useAuthSignUp = ({ onError, onSuccess }: Props) => {
  const execute = useCallback(
    async (data: SignUpFormTypes): Promise<AxiosResponse<{ message?: string }>> => {
      return await Http.request<SignUpFormTypes, { message?: string }>('POST', '/user', data);
    },
    [],
  );

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: execute,
    mutationKey: ['sign-up-form'],
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

export default useAuthSignUp;
