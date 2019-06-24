import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAchievementsComponent } from './last-achievements.component';

describe('LastAchievementsComponent', () => {
  let component: LastAchievementsComponent;
  let fixture: ComponentFixture<LastAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
