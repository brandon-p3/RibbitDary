import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTareasComponent } from './create-tareas.component';

describe('CreateTareasComponent', () => {
  let component: CreateTareasComponent;
  let fixture: ComponentFixture<CreateTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
