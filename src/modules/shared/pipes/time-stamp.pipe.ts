import {Pipe, PipeTransform} from '@angular/core';
import {environment} from 'src/environments/environment';


@Pipe({name: 'timeStampPipe'})
export class TimeStampPipe implements PipeTransform {
  transform(imageId: string, timeStamp: any) {
    return `${environment.apiUrl}/api/files/${imageId}?timeStamp=${timeStamp}`;
  }
}
