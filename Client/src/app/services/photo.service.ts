import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/Photo';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  API_URI:string = "http://localhost:4000/api"

  constructor(private http:HttpClient) { }

  createPhoto(title:string, description:string, photo:File){
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(`${this.API_URI}/photos`, fd);
  }
  getPhotos(){
    return this.http.get<Photo[]>(`${this.API_URI}/photos`);
  }
}
