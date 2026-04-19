declare module "*.svg?component" {
  interface Props {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
  const content: React.FunctionComponent<React.ComponentProps<"svg"> & {}>;
  export default content;
}
