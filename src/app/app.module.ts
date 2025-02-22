import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login-panel/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [HomeComponent, AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false, // Set to true if you want automatic login
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '57908287050-bgpdva3tgo6mdjaaaq3jb659g46d47no.apps.googleusercontent.com' // 🔥 Replace with your actual Client ID
          ),
        },
      ],
    } as SocialAuthServiceConfig,
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
