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

type IconObject = 'arrow' | 'actions' | 'app' | 'form';

export const icons: Record<IconObject, Record<string, IconRFCType>> = {
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
  app: {
  	logo: (props) => <LogoSVG {...props} />,
  },
  form: {
  	calendar: (props) => <IconCalendarSVG {...props} />,
  },
};
