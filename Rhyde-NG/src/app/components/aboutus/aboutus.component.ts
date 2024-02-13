import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent implements OnInit{
  @Input('aboutustext') aboutustext!: string
  @Input('aboutHeading') aboutHeading!: string
  @Input('aboutusImage') aboutusImage!: string

  ngOnInit(): void {
    console.log(this.aboutusImage);
    console.log('yteyt');
  }
}
