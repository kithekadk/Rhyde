import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HostbinderDirective } from '../../directives/hostbinder.directive';
import { service } from '../../interfaces/home.interfaces';
import { SentencecasePipe } from '../../pipes/sentencecase.pipe';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent, FormsModule, HostbinderDirective, SentencecasePipe, AboutusComponent, FooterComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { 
  app_title:string='Rhyde Application'
  link = 'https://cdn.pixabay.com/photo/2021/06/10/12/41/ride-6325906_640.png'
  name = "User"
  cohortname = ''

  // This is for about us section
  aboutusText = "Rhide is the best mobility app. We’re making cities for people, offering better alternatives for every purpose a private car serves — including ride-hailing, shared cars, scooters, and food and grocery delivery."

  aboutUsImg = '../../../assets/aboutus.jpg'

    // This is the end of about us section

  constructor(private renderer: Renderer2){}

  // @ViewChild('paragraphID') paragraphID!:ElementRef

  para = 'Rhide provides seamless transportation solutions at their fingertips. With a vast network of drivers and user-friendly features, Rhide ensures swift pickups and secure, enjoyable rides for all. '

  // ngAfterViewInit():void{
  //   let p = this.renderer.createElement('p')
  //   let text = this.renderer.createText(this.para)

  //   this.renderer.appendChild(p, text)
  //   this.renderer.appendChild(this.paragraphID.nativeElement, p)
  // }


  deleteImage(){
    this.link=''
  }

  displayCohort(cohort:string){
    this.cohortname = cohort   
  }

  clickMe(){
    console.log('clicked');
  }

  services: service[] = [
    {
      name: "Rides",
      description: "Order and get your ride in seconds",
      image: "../assets/car.jpg"
    },
    {
      name: "Shipping",
      description: "Shop and Ship",
      image: "../assets/delivery.jpg"
    },
    {
      name: "Share a ride",
      description: "Join other rhiders moving to your direction",
      image: "../assets/share.jpg"
    },
    {
      name: "Jobs",
      description: "Become the next driver an earn from it",
      image: "../assets/driver.jpg"
    },
  ]
}
