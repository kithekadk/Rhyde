import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentroute = (this.route.snapshot.routeConfig?.path);
  token = this.getToken()
  constructor(private router:Router, private route:ActivatedRoute){

    if(this.currentroute == 'login'){
      if(this.token){
        this.router.navigate([''])
      }
    }
  }
  title = 'Rhyde'

  isLoggedIn = this.getToken()

  today = new Date()

  getToken(){
    if(typeof window !== 'undefined'){
      return localStorage?.getItem('token') as string
    }else{
      return null
    }
  }

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
