import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovativeFundingComponent } from './innovative-funding.component';

describe('InnovativeFundingComponent', () => {
  let component: InnovativeFundingComponent;
  let fixture: ComponentFixture<InnovativeFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovativeFundingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnovativeFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
