import AuthSignUp from '@/component/view/auth-signup';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Sign Up Page`,
    description: `Sign Up Page Decription`,
  };
};

export default function Login() {
  return <AuthSignUp />;
}
