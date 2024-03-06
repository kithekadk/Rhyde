import { Pipe, PipeTransform } from '@angular/core';
import { users } from '../interfaces/users.interfaces';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(users: users[], name: string): users[] {
    if(!users || name == ''){
      return users
    }

    const filtered: users[] =[]

    for(let user of users){
      if(user.name.toLowerCase().includes(name.toLowerCase())){
        filtered.push(user)
      }
    }

    return filtered
  }

}
