import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradesW1Component } from './upgrades-w1.component';

describe('UpgradesW1Component', () => {
  let component: UpgradesW1Component;
  let fixture: ComponentFixture<UpgradesW1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradesW1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradesW1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
