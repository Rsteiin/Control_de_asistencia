import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule} from '@app/material.module'  
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { OkDialogComponent } from './shared/components/ok-dialog/ok-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmDialogComponent,
    OkDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { };
