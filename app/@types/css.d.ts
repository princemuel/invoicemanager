import "react";

declare module "react" {
  interface CSSProperties {
    [index: `--theme-${string}`]: string & {};
    [index: `--${string}`]: string & {};
    [index: string]: string & {};
  }
}
