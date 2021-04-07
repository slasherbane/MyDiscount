import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserRegister } from '../../interfaces/user-register';
import { AuthService } from '../../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePickerConf } from 'ngp-image-picker';
import { ToastGeneratorService } from 'src/app/services/toast-generator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../login/login.page.scss', './register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: UserRegister = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    image: '',
  };
  isError = true;
  isErrorPhone = true;
  isErrorLiteral = true;
  imagePickerConfig: ImagePickerConf = {
    borderRadius: '50%',
    language: 'en',
    width: '150px',
    height: '150px',
  };

  constructor(
    private camera: Camera,
    private service: AuthService,
    private toast: ToastController,
    private loader: LoadingController,
    private route: Router
  ) {}

  ngOnInit() {}

  async register() {
    const load = await this.loader.create({
      message: 'Veuillez patienter...',
    });

 
    await load.present();
  
    await this.service
      .register(this.user)
      .then(async (data: any) => {
        await this.loader.dismiss();
        this.route.navigate(['/login']);
      })
      .catch(async (err) => {
        if( err.status === 413){
          await this.loader.dismiss();
          ToastGeneratorService.generate("Votre image est trop grande !",4000,"bottom","")
          return
        }
        await this.loader.dismiss();
        ToastGeneratorService.generate("Un erreur est survenu",3000,"bottom","")
      });
   
  }

  checkEmail() {
    console.log(this.user.email);
    const regex = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    );
    this.isError = regex.test(this.user.email.trim()) ? false : true;
  }

  checkLiteral() {
    const reg = new RegExp(/[a-zA-Z]+/);
    this.isErrorLiteral = reg.test(this.user.first_name.trim()) ? false : true;
  }

  checkNumeral() {
    const reg = new RegExp(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );

    this.isErrorPhone = reg.test(this.user.phone) ? false : true;

    console.log(this.isError);
  }

  isSamePass() {}

  onUpload(event: any) {
    this.user.image = event;
    /* const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log(base64Image);
      },
      (err) => {
        alert(err);
      }
    );*/
  }
}
