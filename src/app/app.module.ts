import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideRouter } from '@angular/router';
import { routes } from '../app/app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderProfileComponent } from './components/header-profile/header-profile.component';
import { SuccessModalComponent } from './pages/signup/success-modal/success-modal.component';
import { ModalDefaultComponent } from './components/modal-default/modal-default.component';
import { EmailSuccessfullySentModal } from './pages/recovery-password/email-successfully-sent-modal/email-successfully-sent-modal';


@NgModule({
  declarations: [
  AppComponent,
  SidebarComponent,
  NavbarComponent,
  HeaderProfileComponent,
  SuccessModalComponent,
  ModalDefaultComponent,
  EmailSuccessfullySentModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
