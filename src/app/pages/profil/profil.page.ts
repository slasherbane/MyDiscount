import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalDataService } from '../../services/local-data.service';
import { JwtService } from '../../services/jwt.service';
import { OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ToastGeneratorService } from '../../services/toast-generator.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private jwt: JwtService,
    private local: LocalDataService,
    private loader: LoadingController,
    private data: DataService
  ) {}

  token: any;
  imageProfile: any;
  ngOnDestroy(): void {
    console.log('destroy');
  }

  async ngOnInit() {
    const load = await this.loader.create({
      message: 'Veuillez patienter...',
    });

    await load.present();
    try {
      await this.getData().then((t) => {
        this.token = t;
      });
      await this.data
        .getUserImage()
        .then(async (data: any) => {
          if (data === undefined || data === null) {
            this.imageProfile = '';
          }
          this.imageProfile = data.image;
          await load.dismiss();
        })
        .catch((err) => {
          ToastGeneratorService.generate(
            'Impossible de charger votre image de profil !',
            3000,
            'top',
            ''
          );
        });
      await load.dismiss();
    } catch (err) {
      ToastGeneratorService.error();
      await load.dismiss();
    }
    await this.loader.dismiss();
  }

  async clear() {
    await this.local.clearToken();
  }

  home() {
    this.route.navigate(['/home']);
  }

  async getData() {
    return await this.jwt.decode();
  }
}
