import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageWorld1Component } from './main-page-world1.component';

describe('MainPageWorld1Component', () => {
  let component: MainPageWorld1Component;
  let fixture: ComponentFixture<MainPageWorld1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageWorld1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageWorld1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
