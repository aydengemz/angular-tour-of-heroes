import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Cat } from './cat';
import {CatService } from './cat.service';

@Component({
  selector: 'my-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
  cats: Cat[];
  selectedCat: Cat;
  addingCat = false;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private catService:CatService) { }

  getcats(): void {
    this.catService
      .getCats()
      .then(cats => this.cats = cats)
      .catch(error => this.error = error);
  }

  addCat(): void {
    this.addingCat = true;
    this.selectedCat = null;
  }

  close(savedHero:Cat): void {
    this.addingCat = false;
    if (savedHero) { this.getcats(); }
  }

  deleteCat(cat :Cat, event: any): void {
    event.stopPropagation();
    this.catService
      .delete(cat)
      .then(res => {
        this.cats = this.cats.filter(h => h != cat);
        if (this.selectedCat === cat) { this.selectedCat = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getcats();
  }

  onSelect(cat:Cat): void {
    this.selectedCat = cat;
    this.addingCat = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCat.id]);
  }
}
