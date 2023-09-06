import { Component, OnInit, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import { meses, turnos } from '@app/shared/constantes/constantes';
import { InstitucionesService } from '@app/shared/services/instituciones.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  container = "id"
  //select options 
  years = [];
  meses = meses;

  //selected options 
  selected_year = 0;
  selected_month = "";

  //turnos
  turnos = turnos;
  selected_turno = [turnos[0].value, turnos[1].value, turnos[2].value];
  //instituciones 
  instituciones;
  selected_institucion = 1;

  //destroy 
  private destroy$ = new Subject<any>();

  constructor(
    private instSvc: InstitucionesService
  ) { }

  ngOnInit(): void {
    //for years
    let new_years = getYears();
    this.years = new_years.years;
    this.selected_year = new_years.actual_year;
    //for months
    this.selected_month = moment().format('MM');
    this.instSvc.Instituciones.pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      this.instituciones = res.map((institucion)=>({
        value: institucion.institucion_id,
        viewValue: institucion.siglas
      }));
    })
    console.log(this.instituciones)
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  onClickSelect(valor:any):void {
    console.log(this.selected_month);
    console.log(this.selected_year);
    console.log(this.selected_institucion);
    console.log(this.selected_turno); 
    console.log("valor",valor)   
    
  }

}

const getYears = () => {
  let actual_year = parseInt(moment().format('YYYY'));
  let years = [];
  for (let i = actual_year; i >= 2021; i--) {
    years.push({value:i, viewValue:i});
  }
  return {years, actual_year};
}
