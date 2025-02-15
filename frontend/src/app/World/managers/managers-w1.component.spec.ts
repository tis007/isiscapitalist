import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersW1Component } from './managers-w1.component';

describe('ManagersW1Component', () => {
  let component: ManagersW1Component;
  let fixture: ComponentFixture<ManagersW1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagersW1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagersW1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
