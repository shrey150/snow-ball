import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowDayCalcPage } from './snow-day-calc.page';

describe('SnowDayCalcPage', () => {
  let component: SnowDayCalcPage;
  let fixture: ComponentFixture<SnowDayCalcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowDayCalcPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowDayCalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
