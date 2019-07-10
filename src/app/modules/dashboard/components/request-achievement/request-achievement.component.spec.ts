import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAchievementComponent } from './request-achievement.component';

describe('RequestAchievementComponent', () => {
  let component: RequestAchievementComponent;
  let fixture: ComponentFixture<RequestAchievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAchievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
