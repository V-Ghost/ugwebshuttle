import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusstopSelectComponent } from './busstop-select.component';

describe('BusstopSelectComponent', () => {
  let component: BusstopSelectComponent;
  let fixture: ComponentFixture<BusstopSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusstopSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusstopSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
