import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @Input() email: string;

  constructor(private modal: ModalController) {}

  ngOnInit() {}

  onChange(event: any) {
    this.email = event.detail.value;
    console.log(this.email);
  }

  close() {
    this.modal.dismiss({
      dismissed: true,
    });
  }
}
