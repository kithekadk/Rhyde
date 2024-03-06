import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { users } from '../../interfaces/users.interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {

  users:users[]=[]

  filter = ''

  constructor(private api: ApiService){
    this.fetchUsers()
  }

  fetchUsers(){
    this.api.getUsers().subscribe(res=>{
      console.log(res);

      this.users = res.users
    })
  }

  deleteUser(id:string){
    this.api.deleteUser(id).subscribe(res=>{
      console.log(res);

      this.fetchUsers()
    })
  }

}
