import { cx } from 'cva';
import type { IconType } from 'react-icons';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Provider } from '../atoms';

interface Props {
  className?: string;
}

const icons = [FcGoogle, AiFillGithub];
const providers: IProvider[] = [
  {
    id: 'github',
    name: 'Github',
  },
  {
    id: 'google',
    name: 'Google',
  },
];

interface Props {
  className?: string;
  children: (
    providers: IProvider[],
    icons: IconType[],
    Provider: ({
      provider,
      icon,
    }: {
      provider: IProvider;
      icon: IconType;
    }) => JSX.Element
  ) => React.ReactNode;
}

export function ProviderButtons({ className, children }: Props) {
  return (
    <div className={cx('flex w-full flex-col gap-8', className)}>
      {children?.(providers, icons, Provider)}
    </div>
  );
}
