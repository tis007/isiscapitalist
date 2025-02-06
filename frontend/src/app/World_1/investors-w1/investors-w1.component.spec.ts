import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsW1Component } from './investors-w1.component';

describe('InvestorsW1Component', () => {
  let component: InvestorsW1Component;
  let fixture: ComponentFixture<InvestorsW1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorsW1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorsW1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
