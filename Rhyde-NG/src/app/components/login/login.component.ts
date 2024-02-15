import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { loginDetails } from '../../interfaces/login.interfaces';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    title = 'Login Here'
    link = '../assets/login.png'

    constructor(private router:Router){}

    login(details:loginDetails){
      console.log(details);

      localStorage.setItem('loggedIn', 'true')
      
      this.router.navigate(['admin'])
    }
}
