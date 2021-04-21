import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { UserRegister } from '../interfaces/user-register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://mydiscount.eu-4.evennode.com/auth'; // sera canger par notre api a nous
  constructor(
    private http: HttpClient,
    private platform: Platform,
    private storage: NativeStorage
  ) {}
  async  
  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return new Promise((resolve, reject) => {
      return this.http
        .request('POST', this.url + '/login', {
          body: {
            email: email,
            password: password,
          },
        })
        .toPromise()
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err.error);
        });
    });
  }

  logout() {
    return this.platform.is('desktop')
      ? localStorage.clear()
      : this.storage.clear();
  }

  getProfile() {
    return this.http.get(this.url + '/profil');
  }

  register(user: UserRegister) {
    return new Promise((resolve, reject) => {
      return this.http
        .post(this.url + '/register', {
          firstname: user.first_name,
          lastname: user.last_name,
          password: user.password,
          image: user.image,
          phone: user.phone,
          email: user.email,
        })
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
