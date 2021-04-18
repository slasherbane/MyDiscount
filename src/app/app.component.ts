import { Component } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { JwtService } from './services/jwt.service';
import { filter, takeUntil } from 'rxjs/operators';
import { ToastGeneratorService } from './services/toast-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  static jwtWatcher = null;
  constructor(private route: Router, private jwt: JwtService) {
    clearInterval(AppComponent.jwtWatcher);
    AppComponent.jwtWatcher = setInterval(() => {
      this.cycleCheckToken();
    }, 30000);
    /*  this.route.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        takeUntil(this.destroyed$),
      )
      .subscribe(async (event: NavigationStart) => {
         // handle navigation start event
          
         if (!this.jwt.verify(await this.jwt.getToken()) &&  !event.url.startsWith("/login") && !(event.url === "/") ) {
           this.route.navigate(["/login"]);
          
         }
      });*/

    route.events.subscribe(async (r) => {
      /* if (!this.jwt.verify(await this.jwt.getToken()) &&  !this.route.url.startsWith("/login") && !(this.route.url === "/") ) {
       // console.log(this.route.url)
        //this.route.navigate(['/login']);
      }*/
    });
  }

  async cycleCheckToken() {
    console.log("Jwtwatcher: start pass....")
    var token = '';
    await this.jwt.getToken().then(async (t) => {
      try {
        if (
          !this.jwt.verify(t) &&
          !this.route.url.startsWith('/login')
        ) {
          console.log("Session close");
          await ToastGeneratorService.sessionClose();
          await this.route.navigate(['/login']);
        }
      } catch (err) {
        if (!this.route.url.startsWith('/login')) {
          console.log("Session close");
          await ToastGeneratorService.sessionClose();
          await this.route.navigate(['/login']);
        }
      }
    });
    console.log("Jwtwatcher: Passed")
  }
}
