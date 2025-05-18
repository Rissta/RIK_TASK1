import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinInterfaceComponent } from './min-interface.component';

describe('MinInterfaceComponent', () => {
  let component: MinInterfaceComponent;
  let fixture: ComponentFixture<MinInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
