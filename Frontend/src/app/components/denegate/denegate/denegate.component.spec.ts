/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DenegateComponent } from './denegate.component';

describe('DenegateComponent', () => {
  let component: DenegateComponent;
  let fixture: ComponentFixture<DenegateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenegateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
