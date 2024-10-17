'use client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { User } from '@/app/lib/interfaces';
import { FetchError } from '@/app/lib/fetch';
import { fetchUserInfo } from '@/app/lib/helpers/fetch-user-info';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AuthContext = createContext<{
  authLoading: boolean;
  user: undefined | User;
  setUser: Dispatch<SetStateAction<undefined | User>>;
}>({
  authLoading: true,
  user: undefined,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const initialized = useRef(false);
  const router = useRouter();
  const [authLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    if (Cookies.get('token')) {
      setLoading(true);
      fetchUserInfo(Cookies.get('token') as string)
        .then((userInfo) => setUser(userInfo))
        .catch((error: FetchError) => {
          if (error.status === 401) {
            Cookies.remove('token');
            toast.error('Your session has expired, Please login.');
            router.push('/users/login');
          } else {
            toast.error('Something went wrong, try refreshing the page.');
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
