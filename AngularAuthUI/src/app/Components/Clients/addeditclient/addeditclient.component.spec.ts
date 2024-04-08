import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditclientComponent } from './addeditclient.component';

describe('AddeditclientComponent', () => {
  let component: AddeditclientComponent;
  let fixture: ComponentFixture<AddeditclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditclientComponent]
    });
    fixture = TestBed.createComponent(AddeditclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
