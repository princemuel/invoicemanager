interface IRoute {
  text: string;
  icon?: string;
  url: __route_internal_types__.RouteImpl<string>;
}
interface ISocial {
  text: string;
  icon: IconRFCType;
  url: string;
}

type IconRFCType = (props: IconProps) => React.JSX.Element;
