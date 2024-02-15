import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { updatedUser, users } from '../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = localStorage.getItem('token') as string
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<{users:users[], error: string}>('http://localhost:4100/users', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  deleteUser(id:string){
    return this.http.delete(`http://localhost:4100/users/delete/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  getOneUserDetails(id:string){
    return this.http.get<{user:users[]}>(`http://localhost:4100/users/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }


  updateUserDetails(id:string, details:updatedUser){
    return this.http.put<{message:string, error:string}>(`http://localhost:4100/users/update/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }
}
