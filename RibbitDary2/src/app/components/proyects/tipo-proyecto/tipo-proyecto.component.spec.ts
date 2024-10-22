import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProyectoComponent } from './tipo-proyecto.component';

describe('TipoProyectoComponent', () => {
  let component: TipoProyectoComponent;
  let fixture: ComponentFixture<TipoProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
