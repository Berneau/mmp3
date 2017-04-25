import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Category } from './../interfaces/category'
import { ApiEndpoint } from './../app.config';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  categories: Category[]
  category: Category
  private apiEndpoint = ApiEndpoint

  getCategories() {
    this.categories = [
      {
        name: 'Äpfel',
        imageUrl: '',
        _id: '1'
      },
      {
        name: 'Birnen',
        imageUrl: '',
        _id: '2'
      },
      {
        name: 'Kartoffeln',
        imageUrl: '',
        _id: '3'
      },
      {
        name: 'Käse',
        imageUrl: '',
        _id: '4'
      }
    ]
  }

  private handleError(error: any) {
    console.log(error.statusText, 2000)
  }
}
