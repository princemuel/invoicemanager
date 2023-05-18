import { Text } from '@src/components';
import { Link } from 'react-router-dom';

interface Props {
  message: any;
}

export function AuthError({ message }: Props) {
  return (
    <section className='grid min-h-screen place-content-center'>
      <div className='text-center'>
        <Text as={'h2'} className='text-red-700'>
          {message}
        </Text>
        <Text as={'p'} className='text-3xl underline'>
          <Link to='/login'>Please login again</Link>.
        </Text>
      </div>
    </section>
  );
}
