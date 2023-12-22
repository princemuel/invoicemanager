import { IconArrowLeft, IconArrowRight } from "@/common";
import { tw } from "@/helpers/utils";
import { format } from "date-fns";
import type { DateFormatter } from "react-day-picker";
import { DayContent, DayPicker } from "react-day-picker";
import { buttonVariants } from "./button";

type Props = React.ComponentProps<typeof DayPicker>;

export function DatePicker({
  className,
  classNames,
  hideHead = true,
  fixedWeeks = false,
  formatters,
  showOutsideDays = true,
  ...restProps
}: Props) {
  return (
    <DayPicker
      hideHead={hideHead}
      fixedWeeks={fixedWeeks}
      showOutsideDays={showOutsideDays}
      formatters={{ formatCaption, ...formatters }}
      className={tw("rounded-lg px-5 pb-8 pt-6 shadow-200", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "flex flex-col gap-8 w-full",

        caption: "flex justify-center relative items-center",
        caption_label: "text-400 font-bold leading-200 -tracking-200 ",

        nav: "space-x-1 flex items-center",
        nav_button: tw(buttonVariants()),
        nav_button_previous: "!absolute left-1",
        nav_button_next: "!absolute right-1",

        table: "w-full border-collapse space-y-1",
        tbody: "flex flex-col gap-1",
        row: "flex items-center justify-between",
        cell: tw(
          "text-brand-900 dark:text-brand-100",
          "text-center text-400 font-bold leading-200 -tracking-200",
          "relative focus-within:relative focus-within:z-20",
        ),

        day: tw(
          "inline-grid h-8 w-8 place-content-center p-0",
          "text-400 font-bold leading-200 -tracking-200",
          "aria-selected:!text-brand-500",
        ),
        day_selected: "!text-brand-500",
        day_today: "rounded-full border border-brand-500",
        day_outside: "text-brand-900/10 dark:text-brand-100/10",
        day_disabled: "!text-red-500",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className }) => <IconArrowLeft className={className} />,
        IconRight: ({ className }) => <IconArrowRight className={className} />,
        DayContent: (props) => {
          return (
            <time dateTime={props.date.toISOString()}>
              <DayContent {...props} />
            </time>
          );
        },
      }}
      {...restProps}
    />
  );
}
DatePicker.displayName = "DatePicker";

const formatCaption: DateFormatter = (month, options) => {
  return <>{format(month, "MMM yyyy", { locale: options?.locale })}</>;
};
