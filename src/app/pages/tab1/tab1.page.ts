import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsService } from '../../services/news.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  news: Article[] = [];

  constructor(private newService: NewsService) {}

  ngOnInit(){
    this.loadingNews();
  }

  loadData(event){
    this.loadingNews(event);
  }

  //evento opcional con ?
  loadingNews(event?){
    this.newService.getTopHeadLines().subscribe(resp =>{
      //Verificamos si hay más noticias, si no, para terminarlo
      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.news.push(...resp.articles);

      //Verificamos que completo la solicitud
      if(event){
        event.target.complete();
      }
    })
  }

}
