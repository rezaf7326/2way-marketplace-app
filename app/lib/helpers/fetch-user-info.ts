import { User } from '@/app/lib/interfaces';
import { FetchRequestFactory } from '@/app/lib/fetch';

export async function fetchUserInfo(authToken: string) {
  const { body } = await new FetchRequestFactory()
    .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
    .path('user')
    .create()
    .get<User>({
      headers: { Authorization: authToken },
    });

  return body;
}
