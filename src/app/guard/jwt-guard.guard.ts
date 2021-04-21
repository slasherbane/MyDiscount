import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { ToastGeneratorService } from '../services/toast-generator.service';
import { LocalDataService } from '../services/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanLoad {

  constructor(private jwt:JwtService,private route:Router,private local:LocalDataService){};

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


   return this.jwt.getToken().then(async (token)=>{
    
 if (this.jwt.verify(token)) {
     return true;
    }else{
      await this.local.clearToken();
      await ToastGeneratorService.sessionClose();
     await this.route.navigate(["/login"]);
      return false
    }
    }).catch((err)=>{return false});
    
    
    
  }

  
}
