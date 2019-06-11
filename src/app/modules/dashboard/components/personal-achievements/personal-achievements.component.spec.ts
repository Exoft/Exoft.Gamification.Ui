import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAchievementsComponent } from './personal-achievements.component';

describe('PersonalAchievementsComponent', () => {
  let component: PersonalAchievementsComponent;
  let fixture: ComponentFixture<PersonalAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
