import * as React from 'react';
import {
  IconAddSVG,
  IconArrowDownSVG,
  IconArrowLeftSVG,
  IconArrowRightSVG,
  IconCalendarSVG,
  IconCheckSVG,
  IconDeleteSVG,
  IconEmptySVG,
  LogoSVG,
} from './svg-icons';

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {}

export const icons = {
  arrow: {
    right: (props: IconProps) => <IconArrowRightSVG {...props} />,
    left: (props: IconProps) => <IconArrowLeftSVG {...props} />,
    down: (props: IconProps) => <IconArrowDownSVG {...props} />,
  },
  actions: {
    add: (props: IconProps) => <IconAddSVG {...props} />,
    delete: (props: IconProps) => <IconDeleteSVG {...props} />,
    check: (props: IconProps) => <IconCheckSVG {...props} />,
  },
  logo: (props: IconProps) => <LogoSVG {...props} />,
  calendar: (props: IconProps) => <IconCalendarSVG {...props} />,
  empty: (props: IconProps) => <IconEmptySVG {...props} />,
};
