import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSegment } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment,{static:true}) segment: IonSegment;
  @ViewChild(IonInfiniteScroll, {static:false}) infinitScroll: IonInfiniteScroll;

  categories = ['business','entertainment','general','health','science','sports','technology'];
  news: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(){
    this.segment.value = this.categories[0];
    this.loadingNews(this.categories[0]);
  }

  changeCategory(event){
    this.infinitScroll.disabled=false;
    this.news = [];
    this.loadingNews(event.detail.value)
  }

  loadingNews(categoria:string, event?){
    this.newsService.getTopHeadLinesCategory(categoria)
    .subscribe(resp =>{
      this.news.push(...resp.articles);


      if(resp.articles.length === 0){
        event.target.disabled = true;
        return;
      }

      if(event){
        event.target.complete();
      }
    })
  }

  loadData(event){
    this.loadingNews(this.segment.value, event);
  }

}
