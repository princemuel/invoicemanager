/*==============================*
  EVENT TYPES
  ==============================*/
type ReactFormEvent = React.FormEvent<HTMLFormElement>;
type ReactSelectEvent = React.MouseEvent<HTMLLIElement>;
type ReactInputEvent = React.ChangeEvent<HTMLInputElement>;
type ReactMouseEvent = React.MouseEvent<HTMLButtonElement>;

/*==============================*
      ELEMENT TYPES
      ==============================*/
type $ElementProps<E extends React.ElementType<any>> = {
  children: React.ReactNode;
  as?: E;
};

type ElementProps<E extends React.ElementType<any>> = $ElementProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof $ElementProps<E>>;

interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {}
type SVGComponent = React.ComponentType<React.SVGAttributes<SVGSVGElement>>;

type PropsFrom<O> =
  O extends React.FC<infer Props> ? Props
  : O extends React.Component<infer Props> ? Props
  : O extends object ? { [Prop in keyof O]: O[Prop] }
  : never;

/* -------------------------------------------------------------------------------------------------
 * ForwardRefComponent
 * -----------------------------------------------------------------------------------------------*/

interface ForwardRefComponent<
  IntrinsicElementString,
  OwnProps = {},
  /**
   * Extends original type to ensure built in React types play nice with
   * polymorphic components still e.g. `React.ElementRef` etc.
   */
> extends React.ForwardRefExoticComponent<
    MergeProps<
      IntrinsicElementString,
      OwnProps & { as?: IntrinsicElementString }
    >
  > {
  /**
   * When `as` prop is passed, use this overload. Merges original own props
   * (without DOM props) and the inferred props from `as` element with the own
   * props taking precendence.
   *
   * We explicitly avoid `React.ElementType` and manually narrow the prop types
   * so that events are typed when using JSX.IntrinsicElements.
   */
  <As = IntrinsicElementString>(
    props: As extends "" ? { as: keyof JSX.IntrinsicElements }
    : As extends React.ComponentType<infer P> ? Merge<P, OwnProps & { as: As }>
    : As extends keyof JSX.IntrinsicElements ?
      Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
    : never,
  ): React.ReactElement | null;
}

/* -------------------------------------------------------------------------------------------------
 * MemoComponent
 * -----------------------------------------------------------------------------------------------*/

interface MemoComponent<IntrinsicElementString, OwnProps = {}>
  extends React.MemoExoticComponent<
    ForwardRefComponent<IntrinsicElementString, OwnProps>
  > {
  <As = IntrinsicElementString>(
    props: As extends "" ? { as: keyof JSX.IntrinsicElements }
    : As extends React.ComponentType<infer P> ? Merge<P, OwnProps & { as: As }>
    : As extends keyof JSX.IntrinsicElements ?
      Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
    : never,
  ): React.ReactElement | null;
}

/* -------------------------------------------------------------------------------------------------
 * Utility types
 * -----------------------------------------------------------------------------------------------*/
type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;

type MergeProps<E, P = {}> = P &
  Merge<
    E extends React.ElementType ? React.ComponentPropsWithRef<E> : never,
    P
  >;

/**
 * Infers the OwnProps if E is a ForwardRefExoticComponentWithAs
 */
type OwnProps<E> = E extends ForwardRefComponent<any, infer P> ? P : {};

/**
 * Infers the JSX.IntrinsicElement if E is a ForwardRefExoticComponentWithAs
 */
type IntrinsicElement<E> =
  E extends ForwardRefComponent<infer I, any> ? I : never;
type NarrowIntrinsic<E> = E extends keyof JSX.IntrinsicElements ? E : never;

// type ForwardRefExoticComponent<E, OwnProps> = React.ForwardRefExoticComponent<
//   Merge<
//     E extends React.ElementType ? React.ComponentPropsWithRef<E> : never,
//     OwnProps & { as?: E }
//   >
// >;

type Callback<T> = (data: T) => void;
