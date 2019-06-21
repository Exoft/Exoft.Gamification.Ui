import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAchivementsComponent } from './last-achivements.component';

describe('LastAchivementsComponent', () => {
  let component: LastAchivementsComponent;
  let fixture: ComponentFixture<LastAchivementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastAchivementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAchivementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
