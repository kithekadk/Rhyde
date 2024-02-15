import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router:Router){}
  title = 'Rhyde'

  isLoggedIn = localStorage.getItem('loggedIn')

  today = new Date()

  navigatetoLogin(){
    this.router.navigate(['login'])
  }

  navigatetoRegister(){
    this.router.navigate(['register'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
