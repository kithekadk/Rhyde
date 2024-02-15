import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverdashboardComponent } from './driverdashboard.component';

describe('DriverdashboardComponent', () => {
  let component: DriverdashboardComponent;
  let fixture: ComponentFixture<DriverdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
