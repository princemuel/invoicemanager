import * as React from 'react';

interface IProps extends IconProps {
  fileName: string;
  iconPath?: string;
  onCompleted: () => void;
  onException: () => void;
}

export function Icon({
  fileName,
  iconPath,
  onCompleted,
  onException,
  ...rest
}: IProps) {
  const { error, isLoading, RenderedElement } = useDynamicSVGImport(fileName, {
    onCompleted,
    onException,
    iconPath,
  });

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = (
      <div className='aspect-square w-10 animate-pulse rounded-full bg-slate-400' />
    );
  } else if (error) {
    console.error(error);
    content = null;
  } else if (RenderedElement) {
    content = <RenderedElement {...rest} />;
  }
  return content;
}

interface Options {
  onCompleted?: (
    name: string,
    RenderedElement: React.FC<React.SVGProps<SVGSVGElement>> | undefined
  ) => void;
  onException?: (err: Error) => void;
  iconPath?: string;
}

interface DynamicSVGImportReturn {
  error: Error | undefined;
  isLoading: boolean;
  RenderedElement: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
}

/**
 *
 * @param fileName string
 * @param options Options
 * @returns DynamicSVGImportReturn
 */
function useDynamicSVGImport(
  fileName: string,
  options: Options = {
    iconPath: '../assets/svgs',
  }
): DynamicSVGImportReturn {
  const ImportedIconRef =
    React.useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [isLoading, updateLoadingState] = React.useReducer(
    (previous) => !previous,
    false
  );
  const [error, setError] = React.useState<Error>();

  const { onCompleted, onException } = options;
  React.useEffect(() => {
    updateLoadingState();
    const url = new URL(
      `./${options.iconPath}/${fileName}.svg`,
      import.meta.url
    ).href;

    (async function () {
      try {
        ImportedIconRef.current = (
          await import(/* @vite-ignore */ url)
        ).ReactComponent;
        // const { default: namedImport } = await import(`../assets/icons/${name}.svg`);
        // ImportedIconRef.current = namedImport;
        onCompleted?.(fileName, ImportedIconRef.current);
      } catch (err: any) {
        onException?.(err);
        setError(err);
      } finally {
        updateLoadingState();
      }
    })();
  }, [fileName, onCompleted, onException, options.iconPath]);

  return { error, isLoading, RenderedElement: ImportedIconRef.current };
}
