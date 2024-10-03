import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatmPageComponent } from './matm-page.component';

describe('MatmPageComponent', () => {
  let component: MatmPageComponent;
  let fixture: ComponentFixture<MatmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatmPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
