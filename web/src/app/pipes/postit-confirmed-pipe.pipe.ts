import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postitConfirmedPipe'
})
export class PostitConfirmedPipePipe implements PipeTransform {

  confirmed: boolean

  transform(value: any, args?: any): any {
    if (args != undefined) this.confirmed = args
    else this.confirmed = false

    if (value) return value.filter(e => {return e.confirmed === this.confirmed})
    return null
  }

}
