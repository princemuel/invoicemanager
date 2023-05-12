import { Text } from '@src/components';
import { Link } from 'react-router-dom';

interface Props {
  message: any;
}

export function AuthError({ message }: Props) {
  return (
    <section className='grid min-h-screen place-content-center'>
      <div className=''>
        <Text as={'p'}>{message}</Text>
        <Text as={'p'} className='text-3xl underline'>
          <Link to='/login'>Please login again</Link>.
        </Text>
      </div>
    </section>
  );
}
