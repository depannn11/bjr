import '../public/style.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const protectedRoutes = ['/admin/dashboard', '/user/dashboard'];
    if (protectedRoutes.includes(router.pathname)) {
      const token = document.cookie.split('; ').find(row => row.startsWith('auth-token='));
      if (!token) router.push('/');
    }
  }, [router]);

  return <Component {...pageProps} />;
}