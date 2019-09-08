import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAchievementsComponent } from './assign-achievements.component';

describe('AssignAchievementsComponent', () => {
  let component: AssignAchievementsComponent;
  let fixture: ComponentFixture<AssignAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
