import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { loginDetails } from '../../interfaces/login.interfaces';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    title = 'Login Here'
    link = '../assets/login.png'
    errorMsg!:string
    successMsg!:string

    visible = false
    visible2 = false

    constructor(private router:Router, private authservice:AuthService ){}

    login(details:loginDetails){
      console.log(details);

      this.authservice.loginUser(details).subscribe(res=>{
        console.log(res);
        
        if(res.error){
          this.visible = true
          this.errorMsg = res.error

          setTimeout(() => {
            this.visible = false
          }, 3000);
        }else if(res.message){
          this.visible2 = true
          this.successMsg = res.message

          localStorage.setItem('token', res.token)

          this.authservice.readToken(res.token).subscribe(res=>{
            console.log(res);

            setTimeout(() => {
              this.visible2 = false
              
              if(res.info.role == 'driver'){
                this.router.navigate(['driver'])
              }else if(res.info.role == 'customer'){
                this.router.navigate(['customer'])
              }else if(res.info.role == 'admin'){
                this.router.navigate(['admin'])
              }
            }, 2000);
          })

          
        }
      })



      // localStorage.setItem('loggedIn', 'true')
      
      // this.router.navigate(['admin'])
    }
}
