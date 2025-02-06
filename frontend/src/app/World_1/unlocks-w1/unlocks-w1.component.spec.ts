import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlocksW1Component } from './unlocks-w1.component';

describe('UnlocksW1Component', () => {
  let component: UnlocksW1Component;
  let fixture: ComponentFixture<UnlocksW1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlocksW1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlocksW1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
