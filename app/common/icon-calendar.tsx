import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgIconCalendar = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="#7E88C3" d="M14 2h-.667V.667A.667.667 0 0 0 12.667 0H12a.667.667 0 0 0-.667.667V2H4.667V.667A.667.667 0 0 0 4 0h-.667a.667.667 0 0 0-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2m.667 12c0 .367-.3.667-.667.667H2A.668.668 0 0 1 1.333 14V6.693h13.334z" opacity={0.5} /></svg>;
export default SvgIconCalendar;