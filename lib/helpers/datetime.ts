import { uuid } from '@/common';
import dayjs, { extend } from 'dayjs';
import LocaleData from 'dayjs/plugin/localeData';
import UTC from 'dayjs/plugin/utc';

extend(LocaleData);
extend(UTC);

interface IDay {
  id: ReturnType<typeof uuid>;
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export class DateTime {
  static DAYS = dayjs.weekdaysMin();
  static MONTHS = dayjs.monthsShort();
  static TODAY = dayjs.utc();

  private uuid() {
    return uuid();
  }

  /** generate days in month for calendar*/
  public generate(month = dayjs.utc().month(), year = dayjs.utc().year()) {
    const firstDayInMonth = dayjs
      .utc()
      .year(year)
      .month(month)
      .startOf('month');
    const lastDayInMonth = dayjs.utc().year(year).month(month).endOf('month');

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
        isToday: DateTime.isEqual(firstDayInMonth.date(idx), dayjs.utc()),
      });
    }

    const remaining = 42 - days.length;

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
    datetime: string | IDay['date'] = dayjs.utc(),
    template = 'DD MMM YYYY'
  ) {
    return dayjs.utc(datetime).utc(true).format(template);
  }

  public static parse(
    datetime: string | number | Date | dayjs.Dayjs | null = dayjs.utc()
  ) {
    return dayjs.utc(datetime).utc(true);
  }

  public static isEqual(a: dayjs.Dayjs, b: dayjs.Dayjs) {
    return (
      a.utc(true).toDate().toDateString() ===
      b.utc(true).toDate().toDateString()
    );
  }

  public prevMonth(datetime = dayjs.utc()) {
    return datetime.month(datetime.month() - 1);
  }

  public nextMonth(datetime = dayjs.utc()) {
    return datetime.month(datetime.month() + 1);
  }
}

export const datetime = new DateTime();
