import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../interfaces/user-register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://cda.eu-4.evennode.com/api'; // sera canger par notre api a nous
  constructor(private http: HttpClient) {}
  async;
  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return new Promise((resolve, reject) => {
      /*return this.http
        .post('http://mydiscount.eu-4.evennode.com/auth/register', {
          firstname: 'pp',
          lastname: 'laloie',
          email: 'test@email.fr',
          phone: '0102030405',
          password: 'fraise',
        },{ responseType: 'text' })
        .subscribe((data: any) => {
          if (data.error) {
            reject(false);
          }
          console.log(data);
          resolve(data);
        });*/
      return this.http
        .request('POST', 'http://mydiscount.eu-4.evennode.com/auth/login', {
          body: {
            email: email,
            password: password,
          },
        })
        .toPromise()
        .then((data) => {console.log(data) ;resolve(data)})
        .catch((err) => {console.log(err);reject(err.error)});
    });
  }

  getProfile() {
    return this.http.get(this.url + '/profil');
  }

  register(user: UserRegister) {
    return new Promise((resolve, reject) => {
      return this.http
        .post(this.url + '/signup', user)
        .subscribe((data: any) => {
          if (!data.success) {
            reject(data.message);
          }

          resolve(data);
        });
    });
  }
}
