// This helps with type inference when using the component
export declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export declare type $ElementProps<T> = T extends React.ComponentType<
  infer Props
>
  ? Props extends object
    ? Props
    : never
  : never;
