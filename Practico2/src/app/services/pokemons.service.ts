import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/Pokemon';
import { PokemonWeaknesses } from '../models/PokemonWeaknesses';
import { Pokedex } from '../models/Pokedex';
import { Species } from '../models/Species';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  getPokemons() {
    return this.http.get<Pokedex>('https://pokeapi.co/api/v2/pokemon?limit=100');
  }

  getDetailPokemon(url: string) {
    return this.http.get<Pokemon>(url);
  }

  getPokemonById(id: number | string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getWeaknesses(url: string): Observable<PokemonWeaknesses> {
    return this.http.get<PokemonWeaknesses>(url);
  }

  getSpecies(url: string) {
    return this.http.get<Species>(url);
  }

  getEvolutionChainData(evolutionChainUrl: string) {
    return this.http.get(evolutionChainUrl);
  }

  getPokemonEvolutionChain(pokemon: Pokemon): Observable<any> {
    return this.http.get(pokemon.species.url).pipe(
      switchMap((species: any) => {
        return this.http.get(species.evolution_chain.url);
      }));
  }

  getPokemonGeneration(pokemon: Pokemon): Observable<string> {
    return this.http.get(pokemon.species.url).pipe(
      switchMap((species: any) => {
        return this.http.get(species.generation.url).pipe(
          map((generation: any) => {
            return generation.name;
          }));
      }));
  }

}
