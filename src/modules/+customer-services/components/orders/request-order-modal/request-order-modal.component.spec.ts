import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestOrderModalComponent} from './request-order-modal.component';

describe('RequestOrderModalComponent', () => {
  let component: RequestOrderModalComponent;
  let fixture: ComponentFixture<RequestOrderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestOrderModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
