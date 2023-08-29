import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from './shared/services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Control-Asistencia-Ecu-911';
  opened= false;
  private destroy$ = new Subject<any>();
  @Output() toggleSidenav = new EventEmitter<void>();
  
  constructor(private utilsSvc:UtilsService){

  }
  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$.pipe(takeUntil(this.destroy$))
    .subscribe((res:boolean)=>{
      this.opened = res;})
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete(); 
  }

  ontoggleSidenav():void{
    this.toggleSidenav.emit();
  }
  
}
