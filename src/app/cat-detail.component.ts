import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';



import { Cat } from './cat';
import { CatService } from './cat.service';

@Component({
  selector: 'my-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {
  @Input() cat: Cat;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private catService: CatService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.catService.getCat(id)
            .then(cat => this.cat = cat);
      } else {
        this.navigated = false;
        this.cat = new Cat();
      }
    });
  }

  save(): void {
    this.catService
        .save(this.cat)
        .then(cat => {
          this.cat = cat; // saved hero, w/ id if new
          this.goBack(cat);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedCat: Cat = null): void {
    this.close.emit(savedCat);
    if (this.navigated) { window.history.back(); }
  }
}
