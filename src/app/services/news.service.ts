import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey; 
const urlApi = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key' : apiKey,
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }


  headLinesPage = 0;
  currentCategory = '';
  categoryPage = 0;

  private executeQuery<T>(query:string){

    query = urlApi + query;

    return this.http.get<T>(query,{headers:headers});
  }

  getTopHeadLines(){ 
    this.headLinesPage++;
    return this.executeQuery<ResponseTopHeadLines>(`/top-headlines?country=mx&page=${this.headLinesPage}`);
  }

  getTopHeadLinesCategory(category:string){
    
    if(this.currentCategory === category){
      this.categoryPage++;
    }else{
      this.categoryPage = 1;
      this.currentCategory = category;
    }
    return this.executeQuery<ResponseTopHeadLines>(`/top-headlines?country=mx&category=${category}&page=${this.categoryPage}`);
  }

  
}
