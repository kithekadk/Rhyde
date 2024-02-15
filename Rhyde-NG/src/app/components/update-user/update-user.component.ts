import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { users } from '../../interfaces/users.interfaces';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  updateUserForm!:FormGroup
  id!: string
  user!:users
  constructor(private fb: FormBuilder, private route:ActivatedRoute, private api: ApiService){
    
    this.getUserId()

    this.updateUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      profile_image: ['', [Validators.required]],
      role:['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]]
    })
  }
  getUserId(){
    this.route.params.subscribe(res=>{
      console.log(res['user_id']);
      this.id = res['user_id']

      this.getUserDetails()
    })
  }

  getUserDetails(){
    this.api.getOneUserDetails(this.id).subscribe(res=>{
      console.log(res);
      this.user = res.user[0]

      this.updateUserForm.get('name')?.setValue(this.user.name)
      this.updateUserForm.get('email')?.setValue(this.user.email)
      this.updateUserForm.get('phone_number')?.setValue(this.user.phone_number)
      this.updateUserForm.get('profile_image')?.setValue(this.user.profile_image)
      this.updateUserForm.get('role')?.setValue(this.user.role)
      
    })
  }

  updateUser(){
    this.api.updateUserDetails(this.id, this.updateUserForm.value).subscribe(res=>{
      console.log(res);
      
    })
  }
}
