import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasTareaComponent } from './mapas-tarea.component';

describe('MapasTareaComponent', () => {
  let component: MapasTareaComponent;
  let fixture: ComponentFixture<MapasTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapasTareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapasTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
