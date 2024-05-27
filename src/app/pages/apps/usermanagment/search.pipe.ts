import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search1',
  standalone: true
})
export class SearchPipe1 implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    args = args.toLowerCase();

    return value.filter(function(item:any){
        return JSON.stringify(item).toLowerCase().includes(args);
    });

  }

}
