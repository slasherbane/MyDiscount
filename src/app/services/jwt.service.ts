import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  jwt: JwtHelperService = new JwtHelperService();
  constructor() {}

  isExpired(token: string) {
    return this.jwt.isTokenExpired(token, 1);
  }

  verify(token: string) {
    // this.jwt.
    let verif = false;

    verif = this.jwt.isTokenExpired(token) || this.jwt.getTokenExpirationDate(token) === undefined ||
      this.jwt.getTokenExpirationDate(token) === null
        ? false
        : true;
    return verif;
    //console.log(this.jwt.decodeToken(token));
  }
}
