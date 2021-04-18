import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalDataService } from '../../services/local-data.service';
import { JwtService } from '../../services/jwt.service';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit,OnDestroy {
  constructor(private route: Router, private jwt: JwtService,private local:LocalDataService) {}

  token:any ;
  ngOnDestroy(): void {
    console.log("destroy");
  }

  ngOnInit() {
    this.getData().then((t)=>{
      this.token = t;
      console.log(this.token.image)
    });
   
  }

  async clear(){
    await this.local.clearToken();
  }

  home() {
    this.route.navigate(['/home']);
  }

  async getData() {
    return await this.jwt.decode();
  }
}
