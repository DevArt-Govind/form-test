import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {


  constructor(private http: HttpClient) { }

  // private movieAPI = "https://api.themoviedb.org/3/movie/popular"
  // private apiKey = 'a6a0d280ed773c38f6812d76cbe047ff';
  // private headers = new HttpHeaders({
  //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9...', // Truncated token for security
  //   'Content-Type': 'application/json'
  // });

  // MovieData(): Observable<any> {
  //   const url = `${this.movieAPI}?api_key=${this.apiKey}`
  //   return this.http.get<any>(url, { headers: this.headers });
  // }

  // private apiUrl = "https://rest-api-vftd.onrender.com/api/users"
  private apiUrl = "http://localhost:5000/api/users"

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  // Create a new user
  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, user, { headers });
  }
}
