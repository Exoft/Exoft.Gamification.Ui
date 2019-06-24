import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
  transform(inputDate: any) {
    const date = moment(inputDate);
    const daysDiff = moment().diff(date, 'days');
    if (daysDiff === 0) {
      return `Today, ${date.zone("+06:00").format('hh:mm A')}`;
    } else if (daysDiff === 1) {
      return `Yesterday, ${date.zone("+06:00").format('hh:mm A')}`;
    } else if (daysDiff < 6) {
      return `${daysDiff} days ago, ${date.zone("+06:00").format('hh:mm A')}`;
    }
    return `${date.format('MMM d, YYYY')}`;
  }
}
