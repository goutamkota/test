import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDeviceComponent } from './choose-device.component';

describe('ChooseDeviceComponent', () => {
  let component: ChooseDeviceComponent;
  let fixture: ComponentFixture<ChooseDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
