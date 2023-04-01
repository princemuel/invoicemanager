// import { formatDate } from '@src/helpers';

import { Calendar } from '@src/helpers';

type Props = {};

const PublicRoute = (props: Props) => {
  const datetime = new Date('2023-03-31T02:54:50.051Z');

  console.log(Calendar.formatDate());
  return <h1>PublicRoute</h1>;
};

export { PublicRoute };
