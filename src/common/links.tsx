import * as React from 'react';
import {
  IconAddSVG,
  IconArrowDownSVG,
  IconArrowLeftSVG,
  IconArrowRightSVG,
  IconCalendarSVG,
  IconCheckSVG,
  IconDeleteSVG,
  LogoSVG,
} from './svg-icons';

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {}

export const icons = {
  arrow: {
    right: IconArrowRightSVG,
    left: IconArrowLeftSVG,
    down: IconArrowDownSVG,
  },
  actions: {
    add: IconAddSVG,
    delete: IconDeleteSVG,
    check: IconCheckSVG,
  },
  logo: LogoSVG,
  calendar: IconCalendarSVG,
};
