import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditsellerComponent } from './addeditseller.component';

describe('AddeditsellerComponent', () => {
  let component: AddeditsellerComponent;
  let fixture: ComponentFixture<AddeditsellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditsellerComponent]
    });
    fixture = TestBed.createComponent(AddeditsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
