import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Cat } from './cat';

@Injectable()
export class CatService {
  private catsUrl = 'http://localhost:3001/api/cats';  // URL to web api

  constructor(private http: Http) { }

 getCats(): Promise<Array<Cat>> {
    return this.http
      .get(this.catsUrl)
      .toPromise()
      .then((response) => {
        console.log(response.json());
        return response.json() as Cat[];
      })
      .catch(this.handleError);
  }
   /*getCats(): Promise<Cat[]> {
    return this.http.get(this.catsUrl)
               .toPromise()
               .then(response => response.json().data as Cat[])
               .catch(this.handleError);
  }*/


  getCat(id: number): Promise<Cat> {
    return this.getCats ()
      .then(cats => cats.find(cat => cat.id === id));
  }

  save(Cat: Cat): Promise<Cat> {
    if (Cat.id) {
      return this.put(Cat);
    }
    return this.post(Cat);
  }

  delete(Cat: Cat): Promise<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.catsUrl}/${Cat.id}`;

    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Cat
  private post(Cat: Cat): Promise<Cat> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.catsUrl, JSON.stringify(Cat), { headers: headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Cat
  private put(Cat: Cat): Promise<Cat> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.catsUrl}/${Cat.id}`;

    return this.http
      .put(url, JSON.stringify(Cat), { headers: headers })
      .toPromise()
      .then(() => Cat)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
