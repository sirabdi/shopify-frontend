import { Metadata } from 'next';
import Homepage from '@/component/view/home';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `Home Page`,
    description: `Home Page Decription`,
  };
};

export default function Home() {
  return <Homepage />;
}
