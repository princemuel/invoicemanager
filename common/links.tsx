import {
  IconAddSVG,
  IconArrowDownSVG,
  IconArrowLeftSVG,
  IconArrowRightSVG,
  IconCalendarSVG,
  IconCheckSVG,
  IconDeleteSVG,
  LogoSVG,
} from './icons';

export const icons: ISvgIcons = {
  arrow: {
    right: (props) => <IconArrowRightSVG {...props} />,
    left: (props) => <IconArrowLeftSVG {...props} />,
    down: (props) => <IconArrowDownSVG {...props} />,
  },
  actions: {
    add: (props) => <IconAddSVG {...props} />,
    delete: (props) => <IconDeleteSVG {...props} />,
    check: (props) => <IconCheckSVG {...props} />,
  },
  logo: (props) => <LogoSVG {...props} />,
  calendar: (props) => <IconCalendarSVG {...props} />,
};
