import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { Review } from '../review';
import { of } from 'rxjs';
import { ReviewService } from '../review.service';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let service: ReviewService;

  class MockReviewService {
    stubValue: Review[];

    constructor(){
      this.stubValue = [{
        id:"1",
        userId:"1",
        movieId:"tt0848228",
        title:"Good movie",
        description:"terrible movie"
      }];
    }
    
    getReviews(movieId : string){
      return of(this.stubValue)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewComponent ],
      providers: [{provide: ReviewService, useValue: new MockReviewService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.get(ReviewService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ReviewList property and be Review obj type', () => {
    component.reviews = [new Review()];
    expect(component.reviews).toBeTruthy();
    expect(component.reviews[0] instanceof Review).toEqual(true);
  });

  it('should have list of reviews for the current movie', () => {
    let expectedReviews: Review[];

    service.getReviews('tt0848228').subscribe(review => expectedReviews = review);

    component.showReviews();

    expect(component.reviews).toEqual(expectedReviews);
  });


});
