import { IconProps } from '@src/common';
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

  if (isLoading) {
    return (
      <div className='aspect-square w-10 animate-pulse rounded-full bg-slate-400' />
    );
  }
  if (error) {
    console.error(error);
    return null;
  }

  if (RenderedElement) {
    return <RenderedElement {...rest} />;
  }
  return null;
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

    (async function () {
      try {
        ImportedIconRef.current = (
          await import(`./${options.iconPath}/${fileName}.svg`)
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
  }, [fileName, onCompleted, onException]);

  return { error, isLoading, RenderedElement: ImportedIconRef.current };
}
