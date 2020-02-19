import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeofimageComponent } from './add-typeofimage.component';

describe('AddTypeofimageComponent', () => {
  let component: AddTypeofimageComponent;
  let fixture: ComponentFixture<AddTypeofimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeofimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeofimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
