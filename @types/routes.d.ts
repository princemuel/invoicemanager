interface ILinks {
  routes: IRoute[];
  social: ISocial[];
}

interface IRoute {
  id: string;
  text: string;
  url: __next_route_internal_types__.StaticRoutes;
}
interface IIcons {
  id: string;
  alt: string;
  icon: IconRFCType;
  url: string;
}

type IconRFCType = (props: IconProps) => JSX.Element;

interface ISvgIcons {
  arrow: {
    right: IconRFCType;
    left: IconRFCType;
    down: IconRFCType;
  };
  actions: {
    add: IconRFCType;
    delete: IconRFCType;
    check: IconRFCType;
  };
  logo: IconRFCType;
  calendar: IconRFCType;
}
