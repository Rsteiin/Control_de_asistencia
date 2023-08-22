import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  Role:any= null;
  isSignIn=false;
  @Output() toggleSidenav = new EventEmitter<void>();
  
  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.isLogged.pipe(takeUntil(this.destroy$))
    .subscribe((res)=>(this.isSignIn=res))
    this.authSvc.isRole$.pipe(takeUntil(this.destroy$)).
    subscribe((res)=>(this.Role=res))
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ontoggleSidenav():void{
    this.toggleSidenav.emit();
  }

  onSignOut(){
    this.authSvc.signOut();
    this.Role=null;
  }

}
