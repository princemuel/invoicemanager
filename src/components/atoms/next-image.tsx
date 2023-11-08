import { shimmer, toBase64 } from '@/helpers';
import Image from 'next/image';

export function NextImage({
  alt,
  src,
  width,
  height,
  priority = false,
  placeholder = 'blur',
  blurDataURL = `data:image/svg+xml;base64,${toBase64(
    shimmer(Number(width), Number(height))
  )}`,
  ...rest
}: PropsFrom<typeof Image>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={placeholder === 'empty' ? undefined : blurDataURL}
      {...rest}
    />
  );
}
