import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = 'Join Us Today'

  registerForm!: FormGroup

  constructor(private fb:FormBuilder, private apiservice:ApiService){
    // this.registerForm = new FormGroup({
    //   name: new FormControl('', Validators.required),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   phone_number: new FormControl('', Validators.required),
    //   location: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required)
    // })

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      location: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      role: ['customer']
    })
  }

  registerUser(){
    console.log(this.registerForm.value);
    this.apiservice.registerUser(this.registerForm.value).subscribe(res=>{
      console.log(res);
      
    })
    
  }
}
