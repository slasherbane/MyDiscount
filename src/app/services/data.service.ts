import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as converter from 'xml-js';
import { Article } from '../interfaces/article';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'http://mydiscount.eu-4.evennode.com';
  auth: string = this.url + '/auth';
  data: string = this.url + '/app';
  constructor(
    private http: HttpClient,
    private platform: Platform,
    private storage: NativeStorage
  ) {}

  async getlocalToken() {
    return this.platform.is('desktop')
      ? localStorage.getItem('token')
      : await this.storage.getItem('token');

    //aaaaaaa@aaaaaaa.fr
  }

  async getCategories() {
    return new Promise(async (resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + (await this.getlocalToken()),
        }),
      };

    /*  await this.http
        .get(this.data + '/categories', httpOptions)
        .toPromise()
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });*/
  await this.http.get(this.data + '/categories', httpOptions).subscribe((response)=>{
    resolve(response);
  });

    });
  }

  async getMydiscountDataBy(path: string):Promise<any> {
    return new Promise(async (resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + (await this.getlocalToken()),
        }),
      };
      await this.http
        .get(this.data + path, httpOptions)
        .toPromise()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /*requestByUrlTrashTalk(url: string): Promise<Article[]> {
    return new Promise((resolve, rejects) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Origin: 'http://localhost:3000',
        }),
      };
      this.http
        .get('https://trashtalk.co/feed/', { responseType: 'text' })
        .subscribe((data) => {
          try {
            let json = JSON.parse(
              converter.xml2json(data, { compact: true, spaces: 2 })
            );
            const items = json.rss.channel.item;
            let article: Article[] = [];
            for (const item of items) {
                items.map((art) => {
           let cat =  art.category.map((categ) => {
              categ = categ._cdata;
              return categ;
            });
            art.category = cat
          });

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
  }*/
}
