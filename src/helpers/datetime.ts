import { uuid } from '@src/common';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

interface IDay {
  id: ReturnType<typeof uuid>;
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export class DateTime {
  static DAYS = dayjs.weekdaysMin();
  static MONTHS = dayjs.monthsShort();
  static TODAY = dayjs();

  constructor(private datetime = dayjs) {}

  private uuid() {
    return uuid();
  }

  /** generate days in month for calendar*/
  public generate(
    month = this.datetime().month(),
    year = this.datetime().year()
  ) {
    const firstDayInMonth = this.datetime()
      .year(year)
      .month(month)
      .startOf('month');
    const lastDayInMonth = this.datetime()
      .year(year)
      .month(month)
      .endOf('month');

    const days: Array<IDay> = [];

    // generate prefix dates (last month's)
    for (let idx = 0; idx < firstDayInMonth.day(); idx++) {
      days.push({
        id: this.uuid(),
        isCurrentMonth: false,
        date: firstDayInMonth.day(idx),
        isToday: false,
      });
    }

    // generate current month's dates
    for (
      let idx = firstDayInMonth.date();
      idx <= lastDayInMonth.date();
      idx++
    ) {
      days.push({
        id: this.uuid(),
        date: firstDayInMonth.date(idx),
        isCurrentMonth: true,
        isToday: DateTime.isEqual(firstDayInMonth.date(idx), dayjs()),
      });
    }

    const remaining = 35 - days.length;

    // generate suffix dates (next month's)
    for (
      let idx = lastDayInMonth.date() + 1;
      idx <= lastDayInMonth.date() + remaining;
      idx++
    ) {
      days.push({
        id: this.uuid(),
        date: lastDayInMonth.date(idx),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  }

  public toDateString(
    datetime?: string | IDay['date'],
    template = 'DD MMM YYYY'
  ) {
    return this.datetime(datetime).format(template);
  }

  public static parse(datetime?: string | number | Date | dayjs.Dayjs | null) {
    return dayjs(datetime);
  }

  public static isEqual(a: dayjs.Dayjs, b: dayjs.Dayjs) {
    return a.toDate().toDateString() === b.toDate().toDateString();
  }

  public prevMonth(datetime = this.datetime()) {
    return datetime.month(datetime.month() - 1);
  }

  public nextMonth(datetime = this.datetime()) {
    return datetime.month(datetime.month() + 1);
  }
}

export const datetime = new DateTime(dayjs);
