import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDonutchartComponent } from './dynamic-donutchart.component';

describe('DynamicDonutchartComponent', () => {
  let component: DynamicDonutchartComponent;
  let fixture: ComponentFixture<DynamicDonutchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDonutchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDonutchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
