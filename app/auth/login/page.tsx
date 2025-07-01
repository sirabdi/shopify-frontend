import AuthLogin from '@/component/view/auth-login';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Login Page`,
    description: `Login Page Decription`,
  };
};

export default function Login() {
  return <AuthLogin />;
}
