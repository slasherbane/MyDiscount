import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as converter from 'xml-js';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CommandEntry } from '../interfaces/Command';

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

      await this.http
        .get(this.data + '/categories', httpOptions)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  async getUserImage() {
    return new Promise(async (resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + (await this.getlocalToken()),
        }),
      };

      await this.http
        .get(this.data + '/user/image', httpOptions)
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  async addCommand(commandEntries: CommandEntry[]) {
    return new Promise(async (resolve, reject) => {
      const token = await this.getlocalToken();

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      };
      await this.http
        .put(
          this.data + '/command/add',
          { products: commandEntries },
          httpOptions
        )
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async deleteCommand(id: String) {
    return new Promise(async (resolve, reject) => {
      const token = await this.getlocalToken();

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      };
      await this.http
        .delete(
          this.data + '/command/' + id,

          httpOptions
        )
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getMydiscountDataBy(path: string): Promise<any> {
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


 
}
