import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent {
  title = 'practiceProject';
  movies: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}
