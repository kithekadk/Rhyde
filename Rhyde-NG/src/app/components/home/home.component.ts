import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  app_title:string='Rhyde Application'
  link = 'https://cdn.pixabay.com/photo/2021/06/10/12/41/ride-6325906_640.png'
  name = "User"
  cohortname = ''

  deleteImage(){
    this.link=''
  }

  displayCohort(cohort:string){
    this.cohortname = cohort  
  }
}
