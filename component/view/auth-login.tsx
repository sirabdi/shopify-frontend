'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LogInFormTypes } from '@/types/auth';
import { getErrorMessage } from '@/utils/error';
import useAuthLogin from '@/hooks/useAuthLogin';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Link as Url, Stack, TextField } from '@mui/material';

const AuthLogin = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormTypes>();

  const router = useRouter();

  const { mutate, isPending } = useAuthLogin({
    onSuccess: () => {
      router.push('/');

      toast.success('Login successful!');
      reset();
    },
    onError: (error) => {
      console.log('error ', error);
      const errorMessage = getErrorMessage(error.response?.data);
      toast.error('Login failed! ' + errorMessage);
    },
  });

  const onSubmit: SubmitHandler<LogInFormTypes> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs mx-auto">
      <Stack spacing={2}>
        <TextField
          {...register('email', { required: 'Email is required!' })}
          variant="outlined"
          label="Email"
          type="email"
          helperText={errors.email?.message}
          error={!!errors.email}
        ></TextField>
        <TextField
          {...register('password', { required: 'Pasword is required!' })}
          variant="outlined"
          label="Password"
          type="password"
          helperText={errors.password?.message}
          error={!!errors.password}
        ></TextField>
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Url component={Link} href="/auth/signup" className="self-center">
          Sign Up
        </Url>
      </Stack>
    </form>
  );
};

export default AuthLogin;
