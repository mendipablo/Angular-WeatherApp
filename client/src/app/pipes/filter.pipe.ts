import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const result = [];
    for (const post of value){
      if((post.date.indexOf(arg) >-1) ||  (post.weather[0].weather[0].description.toLowerCase().indexOf(arg.toLowerCase()) >-1)){
        result.push(post);
      };
    };
    return result;
  }

}
