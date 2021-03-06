import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(!args)
    {
      return value;
    }

    return value.filter(obj=>{
      return obj.friendname.includes(args)==true;
    })
  }

}