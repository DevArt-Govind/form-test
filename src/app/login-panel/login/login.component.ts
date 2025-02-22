import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  passwordVisible: boolean = false;


  user: SocialUser | null = null;
  constructor(private authService: SocialAuthService, private router: Router) { }

  //  constructor(private authService: AuthService) {}


  // @ViewChild('googleSignInButton', { static: true }) googleSignInButton!: ElementRef;

  // ngOnInit() {
  //   this.initializeGoogleSignIn();
  // }

  // initializeGoogleSignIn() {
  //   if (typeof google === 'undefined' || !google.accounts) {
  //     console.error('Google API not loaded yet.');
  //     return;
  //   }

  //   google.accounts.id.initialize({
  //     client_id: '57908287050-bgpdva3tgo6mdjaaaq3jb659g46d47no.apps.googleusercontent.com',
  //     callback: this.handleCredentialResponse.bind(this),
  //     ux_mode: "redirect",
  //     login_uri: "http://localhost:4200/user"
  //   });

  //   google.accounts.id.renderButton(
  //     this.googleSignInButton.nativeElement,
  //     { theme: 'outline', size: 'large' } // Customize button
  //   );
  // }

  // handleCredentialResponse(response: any) {
  //   console.log('Google Auth Response:', response);
  //   // Send token to backend for verification
  //   // Redirect to /user after successful login
  //   this.router.navigate(['/user']);

  // }


  passwordShow() {
    const passwordID = document.getElementById('password') as HTMLInputElement;
    if (passwordID) {
      this.passwordVisible = !this.passwordVisible;
      passwordID.type = passwordID.type === 'password' ? 'text' : 'password';
    }
  }
}
