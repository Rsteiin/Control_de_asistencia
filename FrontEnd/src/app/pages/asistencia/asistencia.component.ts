import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit, OnDestroy {
  Zonal:any=null;
  private destroy$ = new Subject<any>();
  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    this.authSvc.isZonal$.pipe(takeUntil(this.destroy$)).
    subscribe((res)=>(this.Zonal=res));
  }

  ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
  }

}
