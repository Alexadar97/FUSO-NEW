import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLinechartComponent } from './dynamic-linechart.component';

describe('DynamicLinechartComponent', () => {
  let component: DynamicLinechartComponent;
  let fixture: ComponentFixture<DynamicLinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicLinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
