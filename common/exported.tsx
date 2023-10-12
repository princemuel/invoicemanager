import {
  IconAddSVG,
  IconArrowDownSVG,
  IconArrowLeftSVG,
  IconArrowRightSVG,
  IconCalendarSVG,
  IconCheckSVG,
  IconMoon,
  IconSun,
  LogoSVG,
} from './assets';

type IconObject = 'arrow' | 'actions' | 'app' | 'form';

export const icons = {
  arrow: {
    right: (props) => <IconArrowRightSVG {...props} />,
    left: (props) => <IconArrowLeftSVG {...props} />,
    down: (props) => <IconArrowDownSVG {...props} />,
  },
  actions: {
    add: (props) => <IconAddSVG {...props} />,
    check: (props) => <IconCheckSVG {...props} />,
  },
  app: {
    logo: (props) => <LogoSVG {...props} />,
    moon: (props) => <IconMoon {...props} />,
    sun: (props) => <IconSun {...props} />,
  },
  form: {
    calendar: (props) => <IconCalendarSVG {...props} />,
  },
} satisfies Record<IconObject, Record<string, IconRFCType>>;
