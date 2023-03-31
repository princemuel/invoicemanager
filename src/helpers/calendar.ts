const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type DateType = Date | string;

type FormatDateFunction = (
  date?: DateType,
  formatOptions?: Intl.DateTimeFormatOptions[],
  separator?: string
) => string;

export class Calendar {
  private static convert(datetime: DateType) {
    return new Date(datetime);
  }

  public static formatDate: FormatDateFunction = (
    date,
    formatOptions,
    separator = ' '
  ) => {
    const safeDate = date || new Date().toISOString();
    formatOptions ||= [
      { day: 'numeric' },
      { month: 'short' },
      { year: 'numeric' },
    ];
    return formatOptions
      .map((options) => {
        const dateFormatter = new Intl.DateTimeFormat('en', options);
        return dateFormatter.format(new Date(safeDate));
      })
      .join(separator);
  };

  public static days(datetime: DateType) {
    const date = 0;
    const monthIndex = Calendar.convert(datetime).getUTCMonth() + 1;
    const year = Calendar.year(datetime);
    return new Date(year, monthIndex, date).getDate();
  }

  public static date(datetime: DateType) {
    return Calendar.convert(datetime).getUTCDate();
  }

  public static month(datetime: DateType) {
    const number = Calendar.convert(datetime).getUTCMonth();
    return months[number].slice(0, 3);
  }

  public static year(datetime: DateType) {
    return Calendar.convert(datetime).getUTCFullYear();
  }
}
