import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movies } from '../movies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movieList',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: Movies[];
  query = '';
  wasClicked = false;

  constructor(private ms: MoviesService, private actRouter: ActivatedRoute) { 
    this.movieList = [];
  }

  onClick() {
    this.wasClicked= !this.wasClicked;
  }

  ngOnInit() {
    this.ms.getAll().subscribe(movies => this.movieList = movies);
    this.update();
  }

  update(){
    console.log('this.actRouter.snapshot.params ' + this.actRouter.snapshot.params['query'])
    this.actRouter.params.subscribe(data => {
      this.query = data.query;
      console.log('This is paramater' + this.query);
      if(this.query===''){
        console.log('This query is empty')
        this.ms.getAll().subscribe(movies => this.movieList = movies);
      }
      else{
        this.ms.getMovieByName(this.query).subscribe(movies => this.movieList = movies);
        console.log('When query is not empty we get: ' + this.movieList[0].Title);
      }
    });
  }
}
