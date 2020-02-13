import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardBadgesComponent} from './dashboard-badges.component';

describe('BadgesComponent', () => {
  let component: DashboardBadgesComponent;
  let fixture: ComponentFixture<DashboardBadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBadgesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
