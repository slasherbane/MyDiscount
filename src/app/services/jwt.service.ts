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
    console.log(this.jwt.decodeToken(token));
  }
}
