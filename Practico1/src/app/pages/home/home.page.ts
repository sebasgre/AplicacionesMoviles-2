import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { Alien, Personajes } from 'src/app/models/Personajes';
import { PersonajesService } from 'src/app/services/personajes.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,
    ComponentsModule, HttpClientModule],
  providers: [PersonajesService]
})
export class HomePage {
  loading: boolean = false;
  showSearchBar: boolean = false;
  searchResults: Alien[] = [];
  
  personajes: {
    heroes: Alien[],
    villains: Alien[],
    antiHeroes: Alien[],
    aliens: Alien[],
    humans: Alien[]
  } = {
      heroes: [],
      villains: [],
      antiHeroes: [],
      aliens: [],
      humans: []
    };

  constructor(private api: PersonajesService, private router: Router) {
    this.getListaPersonajes();
  }
  getListaPersonajes() {
    this.loading = true;
    this.api.getListaPersonajes().subscribe((data: Personajes) => {
      console.log(data);
      this.personajes = data;
      this.loading = false;
    });
  }

  showSearch() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchResults = [];
    }
  }

  searchChanged(event: any) {
    const searchTerm = event.detail.value;
    if (searchTerm) {
      const filtered = this.personajes.heroes
        .concat(this.personajes.villains, this.personajes.antiHeroes, this.personajes.aliens, this.personajes.humans)
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      this.searchResults = filtered;
    } else {
      this.searchResults = [];
    }
  }

  verPersonaje(personaje: Alien) {
    console.log("verPersonaje")
    const serializedPersonaje = JSON.stringify(personaje);
    this.router.navigate(['/detalle/',personaje.name], { queryParams: { personaje: serializedPersonaje } });
  }

  filtrarCategorias(categoria: string) {
    let filtered: Alien[] = [];
  
    switch (categoria) {
      case 'heroes':
        filtered = this.personajes.heroes;
        break;
      case 'villains':
        filtered = this.personajes.villains;
        break;
      case 'antiheroes':
        filtered = this.personajes.antiHeroes;
        break;
      case 'aliens':
        filtered = this.personajes.aliens;
        break;
      case 'humans':
        filtered = this.personajes.humans;
        break;
      default:
        filtered = [];
        break;
    }
  
    this.searchResults = filtered;
  }
  
  
  
  



}
