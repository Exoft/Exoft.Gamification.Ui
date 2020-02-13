import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TotalAchievementsAndExpComponent} from './total-achievements-and-exp.component';

describe('TotalAchievementsAndExpComponent', () => {
  let component: TotalAchievementsAndExpComponent;
  let fixture: ComponentFixture<TotalAchievementsAndExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TotalAchievementsAndExpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAchievementsAndExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
