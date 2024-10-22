import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNarLatComponent } from './nav-nar-lat.component';

describe('NavNarLatComponent', () => {
  let component: NavNarLatComponent;
  let fixture: ComponentFixture<NavNarLatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavNarLatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavNarLatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
