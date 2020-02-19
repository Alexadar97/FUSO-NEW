import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBarchartComponent } from './dynamic-barchart.component';

describe('DynamicBarchartComponent', () => {
  let component: DynamicBarchartComponent;
  let fixture: ComponentFixture<DynamicBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
