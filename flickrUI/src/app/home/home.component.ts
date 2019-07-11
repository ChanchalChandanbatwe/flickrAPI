import { RestApiService } from './../rest-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  photos: any = [];
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  queryParam = {
    page: 1,
    string: ''
  };
  hide: boolean;
  subscription: Subscription;
  loading: boolean;

  constructor(private restApiService: RestApiService) {}

  ngOnInit() {
    // this.getAllPhotos();
    this.appendItems(this.queryParam);
  }

  getAllPhotos() {
    return this.restApiService.getAllPhotos({}).subscribe((data) => {
      this.photos = data.photos.photo;
    });
  }


  addItems(requestParam) {
    this.loading = true;
    this.subscription = this.restApiService.getAllPhotos(requestParam).subscribe((data) => {
      this.photos = data.photos.photo;
      this.hide = true;
      this.loading = false;
      if (this.photos.length > 0) {
        this.hide = false;
      }
      // console.log('this.photos ', this.photos);
    });
  }


  appendItems(requestParam) {
    this.addItems(requestParam);
  }

  prependItems(requestParam) {
    this.addItems(requestParam);
  }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);
    this.queryParam.page++;
    this.appendItems(this.queryParam);
    this.direction = 'down';
  }

  /* onUp(ev) {
    console.log('scrolled up!', ev);
    if (this.queryParam.page > 1) {
      this.queryParam.page--;
      this.prependItems(this.queryParam);
      this.direction = 'up';
    }

  } */

  search(formData) {
    this.queryParam.page = 1;
    this.queryParam.string = formData.searchForTag;
    this.photos = [];
    this.addItems(this.queryParam);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
