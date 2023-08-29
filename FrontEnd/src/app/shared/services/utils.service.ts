import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
@Injectable()
export class UtilsService{
    private sidebarOpened = new BehaviorSubject<boolean>(false);
    private institucion = new BehaviorSubject<string>(null);
    sidebarOpened$ = this.sidebarOpened.asObservable();

    get institution$():Observable<string>{
        return this.institucion.asObservable();
      } 

    openSidebar(value:boolean):void{
        this.sidebarOpened.next(value);
    }

    setInstitucion (institucion:string):void{
        this.institucion.next(institucion);
    }

}