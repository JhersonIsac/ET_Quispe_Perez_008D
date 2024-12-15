import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarClasesPage } from './visualizar-clases.page';

describe('VisualizarClasesPage', () => {
  let component: VisualizarClasesPage;
  let fixture: ComponentFixture<VisualizarClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
