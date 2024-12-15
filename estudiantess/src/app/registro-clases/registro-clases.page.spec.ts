import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroClasesPage } from './registro-clases.page';

describe('RegistroClasesPage', () => {
  let component: RegistroClasesPage;
  let fixture: ComponentFixture<RegistroClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
