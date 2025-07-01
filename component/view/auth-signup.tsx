'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SignUpFormTypes } from '@/types/auth';
import { getErrorMessage } from '@/utils/error';
import useAuthSignUp from '@/hooks/useAuthSignUp';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Link as Url, Stack, TextField } from '@mui/material';

const AuthSignUp = () => {
  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormTypes>();

  const password = watch('password', '');

  const router = useRouter();

  const { mutate, isPending } = useAuthSignUp({
    onSuccess: () => {
      router.push('/auth/login');

      toast.success('Sign up successful!');
      reset();
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error.response?.data);
      toast.error('Sign up failed! ' + errorMessage);
    },
  });

  const onSubmit: SubmitHandler<SignUpFormTypes> = (data) => {
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
          {...register('name', { required: 'Name is required!' })}
          variant="outlined"
          label="Name"
          type="text"
          helperText={errors.name?.message}
          error={!!errors.name}
        ></TextField>
        <TextField
          {...register('password', { required: 'Pasword is required!' })}
          variant="outlined"
          label="Password"
          type="password"
          helperText={errors.password?.message}
          error={!!errors.password}
        ></TextField>
        <TextField
          {...register('confirm_password', {
            required: 'Confirmation Password is required!',
            validate: (value) => value === password || 'The passwords do not match',
          })}
          label="Confirmation Password"
          variant="outlined"
          type="password"
          helperText={errors.confirm_password?.message}
          error={!!errors.confirm_password}
        ></TextField>
        <Button variant="contained" type="submit">
          Register
        </Button>
        <Url component={Link} href="/auth/login" className="self-center">
          Continue Login
        </Url>
      </Stack>
    </form>
  );
};

export default AuthSignUp;
