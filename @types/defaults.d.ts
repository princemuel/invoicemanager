interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {}

type $ElementProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  as?: E;
};

type ElementProps<E extends React.ElementType<any>> = $ElementProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof $ElementProps<E>>;

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {}

type PropsFrom<T> = T extends React.FC<infer Props>
  ? Props
  : T extends React.Component<infer Props>
  ? Props
  : T extends object
  ? { [K in keyof T]: T[K] }
  : never;

/*==============================*
        EVENT TYPES
  ==============================*/
type ReactFormEvent = React.FormEvent<HTMLFormElement>;
type ReactSelectEvent = React.MouseEvent<HTMLLIElement>;
type ReactInputEvent = React.ChangeEvent<HTMLInputElement>;
type ReactMouseEvent = React.MouseEvent<HTMLButtonElement>;

interface PropsWithChildren {
  children: React.ReactNode;
}
