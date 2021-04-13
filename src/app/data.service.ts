import { Injectable } from '@angular/core';

export interface ICategory {
  id: number,
  name: string,
  // price: number,
  image: string,
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCategories() {
      let categories = [];

      let cat1: ICategory = {
        id: 1,
        name: "Femmes",
        image: "https://cdn.pixabay.com/photo/2021/01/21/09/11/mountains-5936682_960_720.jpg"
      }

      let cat2: ICategory = {
        id: 2,
        name: "Hommes",
        image: "https://cdn.pixabay.com/photo/2021/01/21/09/11/mountains-5936682_960_720.jpg"
      } 
        let cat3: ICategory = {
        id: 3,
        name: "enfant",
        image: "https://cdn.pixabay.com/photo/2021/01/21/09/11/mountains-5936682_960_720.jpg"
      }

      categories.push(cat1,cat2,cat3);

      return categories;
  }
}
