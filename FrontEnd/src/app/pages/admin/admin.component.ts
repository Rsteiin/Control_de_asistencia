import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { meses, turnos } from '@app/shared/constantes/constantes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isLoading: boolean = false;
  instituciones = [{viewValue:"Todas", value:"-1"}];
  container = "id"
  //select options 
  years = [];
  meses = meses;

  //selected options 
  selected_year = 0;
  selected_month = "";

  //turnos
  turnos = turnos;
  selected_turno = turnos[0].value;

  constructor() { }

  ngOnInit(): void {
    //for years
    let new_years = getYears();
    this.years = new_years.years;
    this.selected_year = new_years.actual_year;
    //for months
    this.selected_month = moment().format('MM');
    
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
