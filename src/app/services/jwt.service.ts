import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  jwt: JwtHelperService = new JwtHelperService();
  constructor(private platform: Platform, private storage: NativeStorage) {}

  async getToken() {
    var token = '';
    if (this.platform.is('desktop')) {
      token = localStorage.getItem('token');
    } else {
      token = await this.storage.getItem('token');
    }
    return token;
  }

  isExpired(token: string) {
    return this.jwt.isTokenExpired(token, 1);
  }

  decode(): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      await this.getToken()
        .then((t) => {
          console.log('le token :' + t);
          console.log('chef' + JSON.stringify(this.jwt.decodeToken(t)));
          const token = this.jwt.decodeToken(t);
          console.log(JSON.stringify(token));
          resolve(token);
        })
        .catch(() => {
          reject('');
        });
    });
  }

  verify(token: string) {
    // this.jwt.
    let verif = false;

    verif =
      this.jwt.isTokenExpired(token) ||
      this.jwt.getTokenExpirationDate(token) === undefined ||
      this.jwt.getTokenExpirationDate(token) === null
        ? false
        : true;
    return verif;
    //console.log(this.jwt.decodeToken(token));
  }
}
