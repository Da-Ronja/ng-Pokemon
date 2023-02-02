import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, Result } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemonsResults: Result[] = [];
  pokemonList: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
      this.pokemonList = this.pokemonList;
  }

}
