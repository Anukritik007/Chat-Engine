import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import {MessengerComponent } from './messenger/messenger.component';
import {AppRoutingModule} from './app-routing';
import { DataServiceService } from './data-service.service';
import { MyFilterPipe } from './my-filter.pipe';
import { LoginServiceService } from './login-service.service';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http';
import { ResetComponent } from './user/reset/reset.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports:      [ BrowserModule, FormsModule,AppRoutingModule ,HttpClientModule, NgxSpinnerModule],
  declarations: [ AppComponent, LoginComponent, MessengerComponent, MyFilterPipe, UserComponent, SignUpComponent, ResetComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataServiceService, LoginServiceService]
})
export class AppModule { }
