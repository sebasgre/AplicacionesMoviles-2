import { Injectable } from '@angular/core';
import { Personajes } from '../models/Personajes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { }
  
  getListaPersonajes(){
    return this.http.get<Personajes>("assets/application.json");
  }

}
