import Profile from '@/component/view/profile';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Profie Page`,
    description: `Profile Page Decription`,
  };
};

export default function Login() {
  return <Profile />;
}
