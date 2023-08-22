import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  Role:any=null;
  private destroy$ = new Subject<any>();
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.isRole$.pipe(takeUntil(this.destroy$)).
    subscribe((res)=>(this.Role=res));
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


}
