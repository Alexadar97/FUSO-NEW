import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStackedbarchartComponent } from './dynamic-stackedbarchart.component';

describe('DynamicStackedbarchartComponent', () => {
  let component: DynamicStackedbarchartComponent;
  let fixture: ComponentFixture<DynamicStackedbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicStackedbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicStackedbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
