import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificacionInasistenciaPage } from './justificacion-inasistencia.page';

describe('JustificacionInasistenciaPage', () => {
  let component: JustificacionInasistenciaPage;
  let fixture: ComponentFixture<JustificacionInasistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionInasistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
