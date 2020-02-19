import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWaterfallchartComponent } from './dynamic-waterfallchart.component';

describe('DynamicWaterfallchartComponent', () => {
  let component: DynamicWaterfallchartComponent;
  let fixture: ComponentFixture<DynamicWaterfallchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicWaterfallchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicWaterfallchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
