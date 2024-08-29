import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPaquetesComponent } from './crear-paquetes.component';

describe('CrearPaquetesComponent', () => {
  let component: CrearPaquetesComponent;
  let fixture: ComponentFixture<CrearPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearPaquetesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
