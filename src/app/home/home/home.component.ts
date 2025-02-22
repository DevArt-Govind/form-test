import { Component, ElementRef, Injectable, OnInit, ViewChild, viewChild } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { FormsModule } from '@angular/forms';
import { Country, State } from 'country-state-city';
declare const gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  countries: any[] = [];
  states: any[] = [];
  filteredCountries: string[] = [];
  filteredStates: string[] = [];
  selectedCountry: string = '';
  searchQuery: string = '';
  submitted = false;
  errorMessage: string = '';
  isPasswordValid: boolean = true;
  isEmailValid: boolean = true;
  isMobileValid: boolean = true;
  passwordVisible: boolean = false;
  userForm: any;
  profilePictureUrl: string | ArrayBuffer | null = '/placeholder-profile.jpg';
  @ViewChild('successModal') successModal!: ElementRef;
  isSubmitting: boolean = false; // Prevents multiple clicks


  constructor(
    private movieSeries: ApiCallService
  ) { }

  user = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    dob: '',
    country: '',
    state: '',
    employment: '',
    gender: '',
    profileImg: '',
  };

  onSubmit(form: any) {


    let missingFields = [];

    if (!this.user.name) missingFields.push('Name');
    if (!this.user.email) missingFields.push('Email');
    if (!this.user.password) missingFields.push('Password');
    if (!this.user.mobile) missingFields.push('Mobile');
    if (!this.user.country) missingFields.push('Country');
    if (!this.user.dob) missingFields.push('dob');
    if (!this.user.state) missingFields.push('state');
    if (!this.user.employment) missingFields.push('employment');
    if (!this.user.gender) missingFields.push('gender');
    // if (!this.user.profileImg) missingFields.push('Profile');

    if (missingFields.length > 0) {
      this.errorMessage = `Your ${missingFields.join(', ')} is blank.`;

      // ✅ Show modal using plain JavaScript
      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        modalElement.style.display = 'block';
        modalElement.classList.add('show'); // Bootstrap class for visible modals
        modalElement.removeAttribute('aria-hidden');
        modalElement.setAttribute('aria-modal', 'true');
      }
    }
    // Validate email and password
    if (!this.isEmailValid) {
      return; // Stop form submission if email is invalid
    }
    if (!this.isPasswordValid) {
      return; // Stop form submission if password is invalid
    }
    if (!this.isMobileValid) {
      return; // Stop form submission if password is invalid
    }

    if (this.isSubmitting) return; // Prevent multiple clicks
    this.isSubmitting = true;



    this.submitted = true;

    console.log('🟢 Submitting user:', this.user);

    this.movieSeries.addUser(this.user).subscribe(
      (response) => {
        // console.log('✅ User registered successfully:', response);
        const loader = document.querySelector(".loader-wrapper") as HTMLElement;
        loader.style.display = 'block';
        setTimeout(() => {
          loader.style.display = 'none';
          if (this.successModal) {
            this.successModal.nativeElement.style.display = "block"
          }
          this.isSubmitting = false; // Re-enable button after success
        }, 6000)

        // const successModal = document.getElementById("successModal") as HTMLElement;
        // successModal.style.display = "block"
      },
      (error) => {
        console.error('❌ Error registering user:', error);
        this.isSubmitting = false; // Re-enable button after error
      }
    );
  }

  successStatus() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.style.display = 'none';
      const inputFields = document.querySelectorAll('input, select');
      inputFields.forEach((field: any) => {
        if (field.type === 'radio' || field.type === 'checkbox') {
          field.checked = false; // Uncheck radio and checkbox inputs
        } else {
          field.value = ''; // Clear other inputs
        }
      });
      window.location.href = "/"
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        // Use a type assertion to ensure the result is treated as string | ArrayBuffer
        this.profilePictureUrl = e.target?.result as string | ArrayBuffer;
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  // Prevent typing numbers in name field
  restrictToText(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (!/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault(); // Block the character
    }
  }

  restrictToNumbers(event: KeyboardEvent) {
    // Only allow numeric input
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }

    const inputField = event.target as HTMLInputElement;
    const value = inputField.value + event.key; // The new value after the key is pressed

    // Validate mobile number length (10 digits) and start with '6'
    if (value.length > 10 || (value.length === 1 && value! <= '6')) {
      event.preventDefault(); // Block input if it's invalid
    }

    // Call the validation function to check the number while typing
    this.validateMobile();
  }
  validateMobile() {
    const mobilePattern = /^[6-9]\d{9}$/; // Starts with 6 and followed by 9 digits

    // Check if mobile number matches the pattern
    this.isMobileValid = mobilePattern.test(this.user.mobile);
  }


  // Prevent typing letters or special characters in mobile field
  validateMail() {
    const emailPattern = /^[a-zA-Z][a-zA-Z0-9]{5,20}@gmail\.(com|in)$/;
    this.isEmailValid = emailPattern.test(this.user.email);
  }

  validatePassword() {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    this.isPasswordValid = passwordPattern.test(this.user.password);
  }

  passwordShow() {
    const passwordID = document.getElementById('password') as HTMLInputElement;
    if (passwordID) {
      this.passwordVisible = !this.passwordVisible;
      passwordID.type = passwordID.type === 'password' ? 'text' : 'password';
    }
  }

  closeModal() {
    const modalElement = document.getElementById('exampleModal');

    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
    }

  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countries = Country.getAllCountries().map((country) => country.name);
    this.filteredCountries = [...this.countries];
    // console.log(State.getStatesOfCountry())
  }

  onCountryChange(selectedCountry: string): void {
    const countryData = Country.getAllCountries().find(
      (country) => country.name === selectedCountry
    );
    if (countryData) {
      const isoCode = countryData.isoCode;
      this.loadStates(isoCode);
    }
  }

  loadStates(countryCode: string): void {
    this.states = State.getStatesOfCountry(countryCode).map(
      (state) => state.name
    );
    this.filteredStates = [...this.states];
  }

  filterCountries(): void {
    this.filteredCountries = this.countries.filter((country) =>
      country.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


}
