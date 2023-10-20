import { cn } from '@/helpers';
import { Button } from './button';

interface Props {
  status?: 'pending' | 'draft' | 'paid';
  className?: string;
}

function StatusButton({ status = 'pending', className }: Props) {
  return (
    <Button type='button' status={status} className={cn('', className)}>
      <span className={`h-2 w-2 rounded-full bg-current`} />
      <span>{status}</span>
    </Button>
  );
}

export { StatusButton };
