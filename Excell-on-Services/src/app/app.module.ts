import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './client/shared/header/header.component';
import { FooterComponent } from './client/shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './client/feature/home/home.component';
import { AboutComponent } from './client/feature/about/about.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssociateReducer } from './auths/store/Associate/Associate.Reducer';
import { CUSTOMERReducer } from './auths/store/Customer/Custmer.Reducer';
import { UserReducer } from './auth/user/user.reducer';
import { AssociateEffects } from './auths/store/Associate/Associate.Effects';
import { AppEffects } from './auths/store/Common/App.Effects';
import { CustomerEffects } from './auths/store/Customer/Customer.Effects';
import { UserEffect } from './auth/user/user.effects';
import { AuthsModule } from './auths/auths.module';
import { SidebarComponent } from './admin/shared/sidebar/sidebar.component';
import { NavbarComponent } from './admin/shared/navbar/navbar.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({associate:AssociateReducer,customer:CUSTOMERReducer,user:UserReducer}),
    EffectsModule.forRoot([AssociateEffects,AppEffects,CustomerEffects,UserEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,

    AuthsModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
