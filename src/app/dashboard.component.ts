import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import {Cat} from './cat';
import {CatService} from './cat.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //heroes: Hero[] = [];
  cats: Cat[] = [];

  constructor(
    private router: Router,
    //private heroService: HeroService) { }
    private catService: CatService){}

  ngOnInit(): void {
    /* this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
*/
this.catService.getCats()
      .then(cats => this.cats = cats.slice(1, 5));
  }

 /* gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }*/
  gotoDetail(cat: Cat): void {
    const link = ['/detail', cat.id];
    this.router.navigate(link);
  }
}
