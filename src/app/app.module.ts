import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';
import { CatService }          from './cat.service';
import { CatsComponent }      from './cats.component';
import {CatDetailComponent} from './cat-detail.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent,
    CatsComponent,
    CatDetailComponent
  ],
  providers: [HeroService, CatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
