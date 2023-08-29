import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { UtilsService } from '@app/shared/services/utils.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  Role:any=null;
  panelOpenState = false;
  private destroy$ = new Subject<any>();
  
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private utilsSvc: UtilsService
    ) { }

  ngOnInit(): void {
    this.authSvc.isRole$.pipe(takeUntil(this.destroy$)).
    subscribe((res)=>(this.Role=res));
  }
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onInstitucion(institucion: string):void{
    this.utilsSvc.setInstitucion(institucion);
    switch(institucion){
      case "A.M.T":
        this.router.navigate(['/administrador/amt']);        
      break;
      case "A.N.T":
        this.router.navigate(['/administrador/ant']);        
      break;
      case "C.B.D.M.Q":
        this.router.navigate(['/administrador/cbdmq']);        
      break;
      case "C.O.E":
        this.router.navigate(['/administrador/coe']);        
      break;
      case "C.R.E":
        this.router.navigate(['/administrador/cre']);        
      break;
      case "E.M ASEO":
        this.router.navigate(['/administrador/emaseo']);        
      break;
      case "F.F.A.A":
        this.router.navigate(['/administrador/ffaa']);        
      break;
      case "M.S.P Z2":
        this.router.navigate(['/administrador/mspz2']);        
      break;
      case "M.S.P Z9":
        this.router.navigate(['/administrador/mspz9']);        
      break;
      case "P.M.Q":
        this.router.navigate(['/administrador/pmq']);        
      break;
      case "P.P.N.N":
        this.router.navigate(['/administrador/ppnn']);        
      break;
      case "S.N.G.R.E":
        this.router.navigate(['/administrador/sngre']);        
      break;
      default:
      break;
    }
    return;
  }
}
