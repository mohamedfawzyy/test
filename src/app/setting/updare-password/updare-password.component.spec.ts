import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdarePasswordComponent } from './updare-password.component';

describe('UpdarePasswordComponent', () => {
  let component: UpdarePasswordComponent;
  let fixture: ComponentFixture<UpdarePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdarePasswordComponent]
    });
    fixture = TestBed.createComponent(UpdarePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
