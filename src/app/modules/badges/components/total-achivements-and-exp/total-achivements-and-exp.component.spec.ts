import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAchivementsAndExpComponent } from './total-achivements-and-exp.component';

describe('TotalAchivementsAndExpComponent', () => {
  let component: TotalAchivementsAndExpComponent;
  let fixture: ComponentFixture<TotalAchivementsAndExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalAchivementsAndExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAchivementsAndExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
