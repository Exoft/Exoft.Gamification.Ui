import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsRequestsComponent } from './achievements-requests.component';

describe('AchievementsRequestsComponent', () => {
  let component: AchievementsRequestsComponent;
  let fixture: ComponentFixture<AchievementsRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
