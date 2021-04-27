import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../../modals/forgot-password/forgot-password.component';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { JwtService } from '../../services/jwt.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  pass: string = '';
  isErrorMail: boolean = true;

  constructor(
    private jwt: JwtService,
    private auth: AuthService,
    private loader: LoadingController,
    private route: Router,
    private modal: ModalController,
    private platform: Platform,
    private storage: NativeStorage,
    private toast: ToastController
  ) {}

  async ngOnInit() {
    try {
      this.auth.logout();
      let token;
      if (this.platform.is('desktop')) {
        token = localStorage.getItem('token');
      } else {
        token = await this.storage.getItem('token');
      }
      if (token !== undefined && token !== null && token != '') {
        console.log(!this.jwt.verify(token));
        if (!this.jwt.verify(token)) {
          this.route.navigate(['/login']);
          const toast = await this.toast.create({
            message: 'Informations de connexion non valide',
            duration: 2000,
          });
          toast.present();
        } else {
          this.route.navigate(['/home']);
        }
      }
    } catch (err) {}
  }

  checkEmail() {
    const regex = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    );
    this.isErrorMail = regex.test(this.email.trim()) ? false : true;
  }

  async forgotPassword() {
    const modal = await this.modal.create({
      component: ForgotPasswordComponent,
      componentProps: {
        email: this.email,
      },
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async loginForm() {
    const load = await this.loader.create({
      message: 'Connexion...',
    });
    await load.present();
    await this.auth
      .login(this.email, this.pass)
      .then(async (user: any) => {
        if (this.platform.is('desktop')) {
          localStorage.setItem('token', user.token);
          console.log(user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
        } else {
          await this.storage.setItem('token', user.token);
          await this.storage.setItem('user', user.user);
        }

        await this.route.navigate(['/home']);
        this.pass = '';
        await this.loader.dismiss();
      })
      .catch(async (err) => {
        console.log(err);
        await this.loader.dismiss();
        this.email = '';
        this.pass = '';
        this.isErrorMail = true;
      });
    // les observable sont des demande ( promesse). les observable pour etre utilisé doivent appeler subscribe.
    // les promess de faire .then et . catch ce qui permet de controller le comportement des data
  }
}
