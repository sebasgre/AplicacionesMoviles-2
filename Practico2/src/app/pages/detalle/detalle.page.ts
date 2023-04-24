import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { Pokemon } from 'src/app/models/Pokemon';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [PokemonsService]
})
export class DetallePage implements OnInit {

  pokemon: Pokemon | undefined;
  speciesName: string | undefined;
  catch_rate: string | undefined;
  base_friendship: number | undefined;
  weaknesses: string[] | undefined;
  growth_rate: string | undefined;
  weaknessIcons: string[] = [];
  typesIconsMap: Map<string, string> = new Map([
    ['normal', 'normal.svg'],
    ['fighting', 'fighting.svg'],
    ['flying', 'flying.svg'],
    ['poison', 'poison.svg'],
    ['ground', 'ground.svg'],
    ['rock', 'rock.svg'],
    ['bug', 'bug.svg'],
    ['ghost', 'ghost.svg'],
    ['steel', 'steel.svg'],
    ['fire', 'fire.svg'],
    ['water', 'water.svg'],
    ['grass', 'grass.svg'],
    ['electric', 'electric.svg'],
    ['psychic', 'psychic.svg'],
    ['ice', 'ice.svg'],
    ['dragon', 'dragon.svg'],
    ['dark', 'dark.svg'],
    ['fairy', 'fairy.svg']
  ]);

  constructor(private route: ActivatedRoute, private pokemonsService: PokemonsService) { }

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.getPokemonById(pokemonId);
    }
  }

  getPokemonById(id: string) {
    this.pokemonsService.getPokemonById(id).subscribe(pokemon => {
      this.pokemon = pokemon;
      this.getSpeciesName(pokemon.species.url);
      this.get_catch_rate(pokemon.species.url);
      this.get_base_friendship(pokemon.species.url);
      this.get_growth_rate(pokemon.species.url);
      this.weaknesses = this.getIconsWeaknessBySelectedPokemon(pokemon.types);
    });
  }
  

  getAbilities(pokemon: Pokemon) {
    const abilityList: string[] = [];
    pokemon.abilities.forEach(ability => {
      if (ability.is_hidden) {
        abilityList.push(`${ability.ability.name} (hidden ability)`);
      } else if (!abilityList.includes(ability.ability.name)) {
        abilityList.push(ability.ability.name);
      }
    });
    return abilityList.join(', ');
  }

  
  isLast(index: number, array: any[]): boolean {
    return index === array.length - 1;
  }


  getIconsWeaknessBySelectedPokemon(types: any[]) {
    const weaknesses: string[] = [];
    const excludedTypes = ['normal', 'fighting', 'flying', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
    
    types.forEach(type => {
      this.pokemonsService.getWeaknesses(type.type.url).subscribe(typeRes => {
        const doubleDamageFrom = typeRes.damage_relations.double_damage_from.map(damage => damage.name);
        const halfDamageFrom = typeRes.damage_relations.half_damage_from.map(damage => damage.name);
        const noDamageFrom = typeRes.damage_relations.no_damage_from.map(damage => damage.name);
  
        // Find weaknesses by comparing double damage and half damage arrays
        const typeWeaknesses = doubleDamageFrom.filter(x => halfDamageFrom.includes(x) && !excludedTypes.includes(x) && !weaknesses.includes(x));
        // Find weaknesses by comparing double damage and no damage arrays
        typeWeaknesses.push(...doubleDamageFrom.filter(x => noDamageFrom.includes(x) && !excludedTypes.includes(x) && !weaknesses.includes(x)));
  
        // Add weaknesses to array
        weaknesses.push(...typeWeaknesses);
        console.log(weaknesses);
      });
    });
  
    return weaknesses;
  }

  get_EV_Yield(pokemon: Pokemon) {
    const evYield: string[] = [];
    pokemon.stats.forEach(stat => {
      if (stat.effort > 0) {
        evYield.push(`${stat.effort} ${stat.stat.name}`);
      }
    });
    return evYield.join(', ');
  }


  getSpeciesName(url: string) {
    this.pokemonsService.getSpecies(url).subscribe(species => {
      const genera = species.genera.find(g => g.language.name === 'en');
      this.speciesName = genera?.genus;
    });
  }

  get_catch_rate(url: string) {
    this.pokemonsService.getSpecies(url).subscribe(species => {
      const maxHP = species.base_happiness;
      const hp = Math.floor(maxHP / 2);
      const catchRate = species.capture_rate;
      const ballBonus = 1; // Por defecto, se utiliza la Poké Ball estándar
      const statusModifier = 1; // Por defecto, el Pokémon no tiene ningún estado especial
      const formula = (((3 * maxHP - 2 * hp) * catchRate * ballBonus) / (3 * maxHP)) * statusModifier;
      this.catch_rate = `${Math.round(formula * 100) / 100}%`;
    });
  }

  get_base_friendship(url: string) {
    this.pokemonsService.getSpecies(url).subscribe(species => {
      this.base_friendship = species.base_happiness;
    });
  }

  get_growth_rate(url: string) {
    this.pokemonsService.getSpecies(url).subscribe(species => {
      this.growth_rate = species.growth_rate.name;
    });
  }
  
  get_gender() {
    // obten el genero del pokemon y retorna el icono correspondiente
    

  }


  getIconName(weakness: string): string {
    switch (weakness.toLowerCase()) {
      case 'fire':
        return 'fire.svg';
      case 'water':
        return 'water.svg';
      // Agrega más casos para el resto de debilidades
      case 'grass':
        return 'grass.svg';
      case 'electric':
        return 'electric.svg';
      case 'ice':
        return 'ice.svg';
      case 'fighting':
        return 'fighting.svg';
      case 'poison':
        return 'poison.svg';
      case 'ground':
        return 'ground.svg';
      case 'flying':
        return 'flying.svg';
      case 'psychic':
        return 'psychic.svg';
      case 'bug':
        return 'bug.svg';
      case 'rock':
        return 'rock.svg';
      case 'ghost':
        return 'ghost.svg';
      case 'dragon':
        return 'dragon.svg';
      case 'dark':
        return 'dark.svg';
      case 'steel':
        return 'steel.svg';
      case 'fairy':
        return 'fairy.svg';
      default:
        return 'unknown.svg'; // Imagen para debilidades desconocidas
    }
  }
  
  volver() {
    window.history.back();
  }

}
