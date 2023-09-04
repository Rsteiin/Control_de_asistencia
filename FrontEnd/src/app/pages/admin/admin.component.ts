import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isLoading: boolean = false;
  instituciones = [{viewValue:"Todas", value:"-1"}];
  container = "id"

  constructor() { }

  ngOnInit(): void {

  }

}
