import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import SignupComponent from './pages/signup/signup.component';
import { DatePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './common/error/error/error.component'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthinterceptorInterceptor } from './services/authinterceptor.interceptor';
import { PostComponent } from './common/post/post/post.component';
import { NavbarComponent } from './common/navbar/navbar/navbar.component';
import { PostListComponent } from './pages/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    PostComponent,
    NavbarComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor, multi:true}, DatePipe], 
  bootstrap: [AppComponent]
})
export class AppModule { }
