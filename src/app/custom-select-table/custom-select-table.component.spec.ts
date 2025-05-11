import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectTableComponent } from './custom-select-table.component';

describe('CustomSelectTableComponent', () => {
  let component: CustomSelectTableComponent;
  let fixture: ComponentFixture<CustomSelectTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
