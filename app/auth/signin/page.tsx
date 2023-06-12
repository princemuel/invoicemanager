import { Provider } from '@/components';
import { getProviders } from 'next-auth/react';

interface Props {}

export default async function Page() {
  const providers = await getProviders();
  return (
    <div>
      <div>
        {Object.values(providers || []).map((provider) => {
          return <Provider key={provider.name} provider={provider} />;
        })}
        s
      </div>
    </div>
  );
}
