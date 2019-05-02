import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from './movies.service';
import { Movies } from './movies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Movies';
  movieList: Movies[];
  searchForm: FormGroup;

  constructor(private router: Router, private fb:FormBuilder, private ms: MoviesService) { }

  ngOnInit() {
    this.ms.getAll().subscribe(movies => this.movieList = movies);
    
    this.searchForm = this.fb.group({
      query: ['', Validators.required]
    });
  }

  onEnter() { 
    this.router.navigate([`/searchResult/${this.searchForm.controls.query.value}`])
  }
}
