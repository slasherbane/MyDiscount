import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private data: DataService) {}

  articles: Article[] ;

  async ngOnInit() {
    this.articles = await this.data.requestByUrlTrashTalk(this.data.urls[0]);
  }

  // voir comment crée des directive
  randomPicture(){

  }
}
