import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProyectosComponent } from './create-proyectos.component';

describe('CreateProyectosComponent', () => {
  let component: CreateProyectosComponent;
  let fixture: ComponentFixture<CreateProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
