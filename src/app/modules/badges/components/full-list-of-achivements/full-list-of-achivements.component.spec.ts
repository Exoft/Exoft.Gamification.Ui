import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullListOfAchivementsComponent } from './full-list-of-achivements.component';

describe('FullListOfAchivementsComponent', () => {
  let component: FullListOfAchivementsComponent;
  let fixture: ComponentFixture<FullListOfAchivementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullListOfAchivementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullListOfAchivementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
