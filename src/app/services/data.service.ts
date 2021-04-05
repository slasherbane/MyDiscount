import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as converter from 'xml-js';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  urls: string[] = ['https://trashtalk.co/feed/'];
  constructor(private http: HttpClient) {}

  getDataByUrl() {
    return new Promise((resolve, rejects) => {
      /* for (const url in this.urls) {
      }*/
    });
  }

  requestByUrlTrashTalk(url: string):Promise<Article[]> {
    return new Promise((resolve, rejects) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          "Origin": "http://localhost:3000"
          
        }),
      };
      this.http.get("https://trashtalk.co/feed/", { responseType: 'text' }).subscribe((data) => {
        try {
          let json = JSON.parse(
            converter.xml2json(data, { compact: true, spaces: 2 })
          );
          const items = json.rss.channel.item;
          let article: Article[] = [];
          for (const item of items) {
            /*  items.map((art) => {
           let cat =  art.category.map((categ) => {
              categ = categ._cdata;
              return categ;
            });
            art.category = cat
          });*/

            article.push({
              category: item.category,
              title: item.title._text,
              description: item.description._cdata,
              pubDate: item.pubDate._text,
              subTitle: '',
              creator: '',
              media: '',
            });
          }
          console.log(article);
          resolve(article);
        } catch (err) {
          rejects(false);
        }
      });
    });
  }
}
