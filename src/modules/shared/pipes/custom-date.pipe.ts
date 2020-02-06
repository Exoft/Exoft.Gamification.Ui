import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'customDate'})
export class CustomDatePipe implements PipeTransform {
  transform(inputDate: any) {
    const date = moment.utc(inputDate);
    const daysDiff = moment().diff(date, 'days');
    const minutesDiff = moment().diff(date, 'minutes');
    const hoursDiff = Math.round(minutesDiff / 60);
    if (daysDiff === 0 && minutesDiff < 60) {
      // return `Today, ${date.zone("+06:00").format('hh:mm A')}`;
      return `${minutesDiff} mins ago`;
    } else if (daysDiff === 0 && minutesDiff >= 60) {
      return `${hoursDiff} hours ago`;
    } else if (daysDiff === 1) {
      return `Yesterday`;
    } else if (daysDiff < 6) {
      return `${daysDiff} days ago`;
    }
    return `${moment(inputDate).format('MMM D, YYYY')}`;
  }
}
